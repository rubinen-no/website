import { Link } from '../Link/index.js';

const html = String.raw;

export const Breadcrumbs = (category, categoryURL) => {
  return html`<ul class="breadcrumbs">
    <li><a href="/">Home</a></li>
    <li>
      <svg
        xmlns="https://www.w3.org/2000/svg"
        aria-label="Chevron Right Icon"
        fill="currentColor"
        stroke="none"
        width="20"
        height="20"
        class="inline-block"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
      ${Link({ to: categoryURL, content: category })}
    </li>
  </ul>`;
};
