// Comprime un video para el hero: H.264, sin audio, arranque rápido (faststart).
// Uso: node scripts/comprimir-video.mjs entrada.mp4
import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';
import ffmpeg from '@ffmpeg-installer/ffmpeg';

const input = process.argv[2];
if (!input) {
  console.error('Uso: node scripts/comprimir-video.mjs entrada.mp4');
  process.exit(1);
}

mkdirSync('public/video', { recursive: true });

const salidas = [
  { file: 'public/video/hero-1080.mp4', height: 1080, crf: 26 },
  { file: 'public/video/hero-720.mp4', height: 720, crf: 28 },
];

for (const { file, height, crf } of salidas) {
  execFileSync(ffmpeg.path, [
    '-y', '-i', input,
    '-an',
    '-vf', `scale=-2:${height}:flags=lanczos,fps=24`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf),
    '-pix_fmt', 'yuv420p', '-profile:v', 'high',
    '-movflags', '+faststart',
    file,
  ], { stdio: 'inherit' });
  console.log(`${file}: ${(statSync(file).size / 1024 / 1024).toFixed(2)} MB`);
}
