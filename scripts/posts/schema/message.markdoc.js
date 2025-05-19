import Markdoc from '@markdoc/markdoc';

const getIconPath = (type) => {
  if (type === 'warning') {
    return 'M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z';
  }

  return 'M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z';
};
const message = {
  children: ['inline'],
  attributes: {
    title: {
      type: String,
      default: 'Note'
    },
    type: {
      type: String,
      default: 'note',
      matches: ['note', 'error', 'info', 'warning', 'success', 'important']
    }
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    return new Markdoc.Tag(
      'div',
      {
        class: attributes.class
          ? `${attributes.class} message ${node.attributes['type']}`
          : `message ${node.attributes['type']}`
      },
      [
        new Markdoc.Tag(
          'span',
          {
            class: 'ph title'
          },
          [
            new Markdoc.Tag(
              'svg',
              {
                class: 'ph icon',
                viewBox: '0 0 16 16',
                width: '16',
                height: '16',
                'aria-hidden': 'true'
              },
              [
                new Markdoc.Tag('path', {
                  d: getIconPath(node.attributes['type'])
                })
              ]
            ),
            node.attributes.title
          ]
        ),
        ...children
      ]
    );
  }
};

export default message;
