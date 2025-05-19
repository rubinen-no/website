import { glob } from 'glob';

import fs from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '../../src/assets/posts');
const files = glob.sync(`${CONTENT_DIR}/*.md`);

files.forEach(async (file) => {
  let rawText = await fs.readFile(file, 'utf-8');

  rawText = rawText.replace('  title:', 'title:');

  await fs.writeFile(file, rawText, 'utf-8');
});
