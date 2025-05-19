import { Link } from '../../navigation/Link/index.js';

const html = String.raw;

export const Header = () => {
  return html`
    <header class="global">
      <a class="logo-title" href="/">
        <svg
          class="logo"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path
            d="M480-120 80-600l120-240h560l120 240-400 480Zm-95-520h190l-60-120h-70l-60 120Zm55 347v-267H218l222 267Zm80 0 222-267H520v267Zm144-347h106l-60-120H604l60 120Zm-474 0h106l60-120H250l-60 120Z"
          />
        </svg>
        Rubinen
      </a>

      <div class="dropdown">
        <button class="dropdown-button">For spillere</button>
        <div class="dropdown-content">
          <a href="https://rubinen.craftingstore.net/">Butikk</a>
          <a href="https://discord.com/invite/mXk4HyD6xE">Discord</a>
          <a href="/regler">Regler</a>
          <a href="https://kart.rubinen.no/">Webkart</a>
          <a href="/guides">Guides</a>
        </div>
      </div>

      ${Link({ to: '/om-oss', content: 'Om oss', className: 'link' })}
    </header>
  `;
};
