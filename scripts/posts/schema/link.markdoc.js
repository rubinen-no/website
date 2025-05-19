import Markdoc from '@markdoc/markdoc';
import { addClassToNode } from '../utils/add-class-to-node.js';

const heading = {
  attributes: {
    href: { type: String, required: true },
    target: { type: String },
    rel: { type: String }
  },
  transform(node, config) {
    node = addClassToNode(node);

    const attributes = node.transformAttributes(config);
    const { href } = attributes;
    const children = node.transformChildren(config);

    if (href && href.indexOf('/') !== 0 && href && href.indexOf('#') !== 0) {
      attributes.target = '_blank';
      attributes.rel = 'noreferrer noopener';
    }

    return new Markdoc.Tag(
      'a',
      {
        ...attributes
      },
      children
    );
  }
};

export default heading;
