/* global process */
import { cx } from '../../../utils/cx.js';

export const Link = (props) => {
  const { content, to, className, style, server = false, ...rest } = props;

  let postfix = '';

  if (!to || (to && to === '')) return '';

  const attrs = Object.entries(rest)
    .map((attr) => {
      const [property, value] = attr;

      return ` ${property}="${value}"`;
    })
    .join(' ');
  const _style = style ? ` style="${style}"` : '';
  const linkClassNames = cx(`${className || ''}`);
  const linkPostFix = (to) => {
    if (to.indexOf('/') === 0 && process.env.NODE_ENV === 'development') {
      return '.html';
    }

    return '';
  };

  // external link
  if (server) {
    return `<a href="${to}" class="${linkClassNames}"${attrs}${_style}>${content}</a>`;
  } else if (to.indexOf('/') !== 0 && to.indexOf('http') !== -1) {
    postfix =
      typeof content === 'string' && content.indexOf('<svg') === -1
        ? ' (opens in new window)'
        : '';

    return `<a href="${to}" target="_blank" rel="noopener noreferrer" class="${linkClassNames}"${attrs}${_style}>${content}${postfix}</a>`;
  } else if (to.indexOf('#') === 0 || to.indexOf('mailto:') !== -1) {
    return `<a href="${to}" class="${linkClassNames}"${attrs}${_style}>${content}</a>`;
  }

  return `<a href="${to + linkPostFix(to)}" data-link="${to + linkPostFix(to)}" class="${linkClassNames}"${attrs}${_style}>${content}</a>`;
};
