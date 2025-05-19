import { glob } from 'glob';

import fs from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PostsList } from '../../src/components/content/PostsList/index.js';
import { Categories } from '../../src/components/navigation/Categories/index.js';
import { Footer } from '../../src/components/page-sections/Footer/index.js';
import { Header } from '../../src/components/page-sections/Header/index.js';
import { Tags } from '../../src/components/page-sections/Tags/index.js';

import { BodyScripts } from './components/BodyScripts/index.js';
import { GlobalCSS } from './components/GlobalCSS/index.js';
import { HeadScripts } from './components/HeadScripts/index.js';
import { OpenGraphTags } from './components/OpenGraphTags/index.js';
import { getFrontmatter } from './utils/get-frontmatter.js';

let tags = [];
let html = '';

const NUMBER_OF_POSTS_ON_FRONTPAGE = '*';
const DIR_NAME = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(DIR_NAME, '../../src/assets/posts');
const TEMPLATE_PATH = resolve(DIR_NAME, '../../src/pages/Index/template.html');
const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
const files = glob.sync(`${CONTENT_DIR}/*.md`).sort().reverse();
const pathToFrontpage = join(DIR_NAME, '../../dist/index.html');
const posts = [];
const categories = [];

files.forEach((file) => {
  const rawText = fs.readFileSync(file, 'utf-8');
  const frontmatter = getFrontmatter(rawText);
  const { year, month, day, slug, category, title, description } = frontmatter;

  posts.push({
    year,
    month,
    day,
    slug,
    category,
    title,
    description,
    tags: frontmatter.tags,
    url: `/${year}/${month}/${day}/${slug}`
  });

  if (frontmatter.category) {
    const { category } = frontmatter;

    categories.push(category);
  }

  if (frontmatter.tags && frontmatter.category.toLowerCase() !== 'archive') {
    tags = [...tags, ...frontmatter.tags];
  }
});

html = TEMPLATE.replace(
  /{{FRONTPAGE_POSTS}}/,
  PostsList(posts, NUMBER_OF_POSTS_ON_FRONTPAGE, 'archive')
);
html = html.replace(/{{OPEN_GRAPH}}/, OpenGraphTags());
html = html.replace(/{{GLOBAL_CSS}}/, GlobalCSS());
html = html.replace(/{{HEAD_SCRIPTS}}/, HeadScripts());

html = html.replace(/{{BODY_SCRIPTS}}/, BodyScripts());
html = html.replace(/{{PAGE_SECTION_HEADER}}/, Header());

html = html.replace(/{{PAGE_SECTION_FOOTER}}/, Footer());
html = html.replace(
  /{{POST_CATEGORIES}}/,
  Categories([...new Set(categories)])
);
html = html.replace(/{{POST_TAGS}}/, Tags([...new Set(tags)]));

fs.writeFileSync(pathToFrontpage, html, 'utf-8');
