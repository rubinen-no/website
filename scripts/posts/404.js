import fs from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Footer } from '../../src/components/page-sections/Footer/index.js';
import { Header } from '../../src/components/page-sections/Header/index.js';

import { BodyScripts } from './components/BodyScripts/index.js';
import { GlobalCSS } from './components/GlobalCSS/index.js';
import { HeadScripts } from './components/HeadScripts/index.js';
import { OpenGraphTags } from './components/OpenGraphTags/index.js';

let html = '';

const DIR_NAME = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = resolve(
  DIR_NAME,
  '../../src/pages/PageNotFound/template.html'
);
const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
const pathTo404 = join(DIR_NAME, '../../dist/404.html');

html = TEMPLATE.replace(/{{OPEN_GRAPH}}/, OpenGraphTags());
html = html.replace(/{{GLOBAL_CSS}}/, GlobalCSS());
html = html.replace(/{{HEAD_SCRIPTS}}/, HeadScripts());
html = html.replace(/{{BODY_SCRIPTS}}/, BodyScripts());
html = html.replace(/{{PAGE_SECTION_HEADER}}/, Header());
html = html.replace(/{{PAGE_SECTION_FOOTER}}/, Footer());

fs.writeFileSync(pathTo404, html, 'utf-8');
