import Markdoc from '@markdoc/markdoc';

import { addClassToNode } from './add-class-to-node.js';
import { getMarkdocConfig } from './get-markdoc-config.js';
import { parseMarkdocFrontmatter } from './parse-markdoc-frontmatter.js';
import { processTokens } from './process-tokens.js';

export const getHTMLfromMarkdown = (md) => {
  if (!md || (md && md.length === 0)) return '';

  const tokenizer = new Markdoc.Tokenizer({ html: true });
  const tokens = tokenizer.tokenize(md);
  const processed = processTokens(tokens);

  let ast = Markdoc.parse(processed);

  const frontmatter = parseMarkdocFrontmatter(ast);
  const config = getMarkdocConfig({ ast, frontmatter });

  ast = addClassToNode(ast);

  const content = Markdoc.transform(ast, config);

  if (content) {
    const rendered = Markdoc.renderers.html(content) || '';

    return rendered;
  } else {
    return '';
  }
};
