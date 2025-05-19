import Markdoc from '@markdoc/markdoc';

import { slugify } from '../../../src/utils/slugify.js';
import { addClassToNode } from '../utils/add-class-to-node.js';

const generateID = (children, attributes) => {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id;
  }

  if (!children) {
    throw new Error('Children not defined');
  }

  const res = [];
  const cb = (e) => {
    if (typeof e === 'string') {
      res.push(e);
    }

    if (e.children) {
      e.children.forEach(cb);
    }
  };

  children.forEach(cb);

  return slugify(res.filter((child) => typeof child === 'string').join(' '));
};
const heading = {
  attributes: {
    level: { type: String }
  },
  transform(node, config) {
    node = addClassToNode(node);

    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const level = node.attributes.level;
    const id = generateID(children, attributes);

    return new Markdoc.Tag(
      `h${level}`,
      {
        id,
        class: attributes.class
      },
      [
        ...children,
        new Markdoc.Tag('a', {
          class: 'heading-link',
          href: `#${id}`,
          role: 'presentation',
          ['aria-label']: 'Lenke til denne overskriften'
        })
      ]
    );
  }
};

export default heading;
