import Markdoc from '@markdoc/markdoc';

import { addClassToNode } from './add-class-to-node.js';
import { getMarkdocConfig } from './get-markdoc-config.js';

export const getHTML = (document) => {
  let { ast } = document;

  ast = addClassToNode(ast);

  const config = getMarkdocConfig(document);
  const content = Markdoc.transform(ast, config);

  if (content) {
    const rendered = Markdoc.renderers.html(content) || '';

    return rendered;
  } else {
    return '';
  }
};
