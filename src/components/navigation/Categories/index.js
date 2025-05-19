import { slugify } from '../../../utils/slugify.js';

import { Link } from '../Link/index.js';

const html = String.raw;

export const Categories = (categories) => {
  return html`<h3 class="ph categories-title">Categories</h3>
    <ul class="ph categories">
      ${[...categories]
    .sort()
    .map((category) => {
      return `
    <li class="ph category">
  ${Link({className: 'category-link', to: `/categories/${slugify(
    category.toLowerCase()
  )}`, content: category})}

    </li>`;
    })
    .join('\n')}
    </ul>`;
};
