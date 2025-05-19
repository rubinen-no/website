import Markdoc from '@markdoc/markdoc';

import heading from '../schema/heading.markdoc.js';
import link from '../schema/link.markdoc.js';
import message from '../schema/message.markdoc.js';

export const getMarkdocConfig = (document) => {
  const { frontmatter } = document;
  const config = {
    tags: {
      message,
      'html-tag': {
        attributes: {
          name: { type: String, required: true },
          attrs: { type: Object }
        },
        transform(node, config) {
          const { name, attrs } = node.attributes;
          const children = node.transformChildren(config);

          return new Markdoc.Tag(name, attrs, children);
        }
      }
    },
    nodes: {
      heading,
      link
    },
    variables: frontmatter
  };

  return config;
};
