import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { products } from '../src/products.js';

const root = new URL('../', import.meta.url);
const styles = readFileSync(new URL('src/css/products.css', root), 'utf8');
const font = process.env.SHARE_CARD_FONT || 'DejaVu-Sans';
const bold = process.env.SHARE_CARD_BOLD_FONT || 'DejaVu-Sans-Bold';
const magick = (args) => execFileSync('magick', args, { cwd: fileURLToPath(root), stdio: 'inherit' });

for (const { slug, name, headline, category, theme, hero, layout } of products) {
  const colors = styles.match(new RegExp(
    `\\.${theme} \\{ --product-ink: (#[\\da-f]+); --product-tint: (#[\\da-f]+); --product-glow: (#[\\da-f]+);`,
  ));
  if (!colors) throw new Error(`Missing share card palette for ${slug}`);
  const [, ink, tint, glow] = colors;
  const media = `public/product-media/${slug}`;
  const args = [
    '-size', '1200x630', `gradient:${tint}-${glow}`,
    '-fill', 'white', '-draw', 'roundrectangle 24,24 1176,606 32,32',
    '-fill', tint, '-draw', 'roundrectangle 656,50 1150,580 24,24',
  ];
  const place = (image, x, y) => args.push('(', ...image, ')', '-gravity', 'NorthWest',
    '-geometry', `+${x}+${y}`, '-compose', 'Over', '-composite');
  const text = (value, face, size, box, color, x, y) => place([
    '-background', 'none', '-fill', color, '-font', face, '-pointsize', String(size),
    '-gravity', 'NorthWest', '-size', box, `caption:${value}`,
  ], x, y);

  place([
    `${media}/icon.webp`, '-resize', '112x112',
    '(', '+clone', '-alpha', 'extract', '-fill', 'black', '-colorize', '100',
    '-fill', 'white', '-draw', 'roundrectangle 0,0 111,111 24,24', ')',
    '-alpha', 'off', '-compose', 'CopyOpacity', '-composite',
  ], 64, 64);
  text(`KAISERAPPS  /  ${category.toUpperCase()}`, bold, 21, '565x40', ink, 64, 204);
  text(name, bold, name.length > 23 ? 52 : 61, '560x150', '#17152a', 60, 253);
  text(headline, font, 29, '560x94', ink, 64, 430);
  text('kaiserapps.com', bold, 21, '560x34', ink, 64, 536);

  const screen = (shot, width, height, x, y) => place([
    `${media}/${shot.file}.webp`, '-resize', `${width}x${height}`,
    '-background', 'none', '-gravity', 'Center', '-extent', `${width}x${height}`,
  ], x, y);
  if (layout === 'portrait' && hero.length > 1) {
    screen(hero[0], 208, 448, 680, 73);
    screen(hero[1], 208, 448, 918, 103);
  } else if (hero.length > 1) {
    screen(hero[0], 416, 232, 672, 70);
    screen(hero[1], 416, 232, 718, 328);
  } else {
    screen(hero[0], 450, 480, 678, 75);
  }
  magick([...args, '-strip', '-sampling-factor', '4:4:4', '-quality', '87', `${media}/share.jpg`]);
}
