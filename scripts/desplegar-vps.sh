#!/usr/bin/env bash
# Publica el sitio en un VPS propio (Hostinger) con nginx + HTTPS (Let's Encrypt).
#
# Uso:  DOMINIO=alvrastudio.com VPS=root@1.2.3.4 bash scripts/desplegar-vps.sh
#   DOMINIO   dominio sin www (el script atiende también www.DOMINIO)
#   VPS       usuario@ip del servidor (root o un usuario con sudo)
#   SSH_KEY   llave privada (por defecto ~/.ssh/alvra_vps)
#   CORREO    correo para avisos de Let's Encrypt (opcional)
#
# Antes: en GoDaddy, registros A de "@" y "www" apuntando a la IP del VPS.
set -euo pipefail

: "${DOMINIO:?Falta DOMINIO, p. ej. DOMINIO=alvrastudio.com}"
: "${VPS:?Falta VPS, p. ej. VPS=root@1.2.3.4}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/alvra_vps}"
CORREO="${CORREO:-}"
SSH=(ssh -i "$SSH_KEY" -o IdentitiesOnly=yes "$VPS")

echo "→ Compilando con SITE_URL=https://$DOMINIO"
SITE_URL="https://$DOMINIO" npm run build

echo "→ Empaquetando dist/"
tar -czf /tmp/alvra-dist.tgz -C dist .
scp -i "$SSH_KEY" -o IdentitiesOnly=yes /tmp/alvra-dist.tgz "$VPS:/tmp/alvra-dist.tgz"

echo "→ Instalando en el servidor"
"${SSH[@]}" "DOMINIO='$DOMINIO' CORREO='$CORREO' bash -s" <<'REMOTO'
set -euo pipefail
S=""; [ "$(id -u)" -ne 0 ] && S="sudo"

if ! command -v nginx >/dev/null; then
  $S apt-get update -y && $S apt-get install -y nginx
fi
if ! command -v certbot >/dev/null; then
  $S apt-get install -y certbot python3-certbot-nginx
fi

RAIZ="/var/www/$DOMINIO"
NUEVO="$RAIZ.nuevo"
$S rm -rf "$NUEVO" && $S mkdir -p "$NUEVO"
$S tar -xzf /tmp/alvra-dist.tgz -C "$NUEVO"
$S rm -rf "$RAIZ.anterior"
[ -d "$RAIZ" ] && $S mv "$RAIZ" "$RAIZ.anterior"
$S mv "$NUEVO" "$RAIZ"
$S chown -R www-data:www-data "$RAIZ"
rm -f /tmp/alvra-dist.tgz

CONF="/etc/nginx/sites-available/$DOMINIO"
if [ ! -f "$CONF" ]; then
  $S tee "$CONF" >/dev/null <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $DOMINIO www.$DOMINIO;
    root $RAIZ;
    index index.html;

    location / {
        try_files \$uri \$uri/ \$uri.html =404;
    }
    location /_astro/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    error_page 404 /404.html;

    gzip on;
    gzip_types text/css application/javascript image/svg+xml application/json;
}
NGINX
  $S ln -sf "$CONF" "/etc/nginx/sites-enabled/$DOMINIO"
fi
# El VPS aloja otros sitios: si la prueba falla, retirar este y no recargar.
if ! $S nginx -t; then
  $S rm -f "/etc/nginx/sites-enabled/$DOMINIO"
  echo "✗ nginx -t falló; se retiró $DOMINIO sin tocar los demás sitios." >&2
  exit 1
fi
$S systemctl reload nginx

if command -v ufw >/dev/null && $S ufw status | grep -q "Status: active"; then
  $S ufw allow 'Nginx Full' >/dev/null
fi

if [ ! -d "/etc/letsencrypt/live/$DOMINIO" ]; then
  if [ -n "$CORREO" ]; then MAIL=(-m "$CORREO"); else MAIL=(--register-unsafely-without-email); fi
  $S certbot --nginx -d "$DOMINIO" -d "www.$DOMINIO" --non-interactive --agree-tos --redirect "${MAIL[@]}" \
    || echo "⚠ No se pudo emitir HTTPS todavía (¿el DNS ya apunta aquí?). Vuelve a correr el script más tarde."
fi
echo "✓ Publicado en $RAIZ"
REMOTO

echo "✓ Listo: https://$DOMINIO"
