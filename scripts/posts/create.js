/* eslint-disable no-console */
import { glob } from 'glob';

import fs from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PostByline } from '../../src/components/meta/PostByline/index.js';
import { Breadcrumbs } from '../../src/components/navigation/Breadcrumbs/index.js';
import { Footer } from '../../src/components/page-sections/Footer/index.js';
import { Header } from '../../src/components/page-sections/Header/index.js';
import { slugify } from '../../src/utils/slugify.js';

import { ArticleCSS } from './components/ArticleCSS/index.js';
import { BodyScripts } from './components/BodyScripts/index.js';
import { GlobalCSS } from './components/GlobalCSS/index.js';
import { HeadScripts } from './components/HeadScripts/index.js';
import { OpenGraphTags } from './components/OpenGraphTags/index.js';
import { createContentManifest } from './utils/create-content-manifest.js';
import { getFrontmatter } from './utils/get-frontmatter.js';
import { getHTML } from './utils/get-html.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '../../src/assets/posts');
const TEMPLATE_PATH = resolve(
  __dirname,
  '../../src/pages/Article/template.html'
);
const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
const contentManifest = createContentManifest(CONTENT_DIR);
const files = glob.sync(`${CONTENT_DIR}/*.md`);

files.forEach((file) => {
  const rawText = fs.readFileSync(file, 'utf-8');
  const frontmatter = getFrontmatter(rawText);
  const document = contentManifest[frontmatter.route];

  if (document) {
    let html = '';
    let rendered = getHTML(document);

    const {
      year,
      month,
      day,
      slug,
      category,
      title,
      image,
      tagline,
      description
    } = frontmatter;

    if (rendered.indexOf('<article>') === 0) {
      if (description) {
        rendered = rendered.replace(
          '<article>',
          `<article><p class="ph lead">${description}</p>`
        );
      }

      html = TEMPLATE.replace(/{{CONTENT}}/, rendered);
    } else {
      if (description) {
        html = TEMPLATE.replace(
          /{{CONTENT}}/,
          `
        <p class="ph lead">
        ${description}
        </p>
        ${rendered}
        `
        );
      } else {
        html = TEMPLATE.replace(/{{CONTENT}}/, rendered);
      }
    }

    html = html.replace(
      /{{OPEN_GRAPH}}/,
      OpenGraphTags({
        type: 'article',
        title,
        url: `https://rubinen.no/${year}/${month}/${day}/${slug}`,
        image,
        description: description
          ? description
              .replaceAll(/(&nbsp;|<([^>]+)>)/gi, '')
              .replaceAll(/"/g, '&quot;')
          : null
      })
    );
    html = html.replace(/{{GLOBAL_CSS}}/, GlobalCSS());
    html = html.replace(/{{HEAD_SCRIPTS}}/, HeadScripts());
    html = html.replace(/{{BODY_SCRIPTS}}/, BodyScripts());
    html = html.replace(/{{PAGE_SECTION_HEADER}}/, Header());

    html = html.replace(/{{PAGE_SECTION_FOOTER}}/, Footer());
    html = html.replace(/{{ARTICLE_CSS}}/, ArticleCSS());
    html = html.replaceAll(/{{TITLE}}/g, title);

    if (description) {
      html = html.replaceAll(
        /{{DESCRIPTION}}/g,
        description
          .replaceAll(/(&nbsp;|<([^>]+)>)/gi, '')
          .replaceAll(/"/g, '&quot;')
      );
    }

    if (tagline && typeof tagline === 'string' && tagline.length !== 0) {
      html = html.replaceAll(/{{TAGLINE}}/g, `<br/><em>– ${tagline}</em>`);
    } else {
      html = html.replaceAll(/{{TAGLINE}}/g, '');
    }

    html = html.replace(
      /{{BREADCRUMBS}}/,
      Breadcrumbs(category, `/categories/${slugify(category)}`)
    );
    html = html.replace(/{{POST_META}}/, PostByline(year, month, day));

    const pathToDir = join(__dirname, `../../dist/${year}/${month}/${day}`);
    const pathToFile = `${pathToDir}/${slug}.html`;

    fs.mkdirSync(pathToDir, { recursive: true });

    fs.writeFileSync(pathToFile, html, 'utf-8');
  } else {
    console.error(`File \`${file}\` not converted, missing \`document\``);
  }
});
