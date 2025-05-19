import { slugify } from '../../../utils/slugify.js';
import { Link } from '../../navigation/Link/index.js';

const html = String.raw;
const MAX_TOP_POSTS = 20;

export const PostsList = (posts, quantity = 20, excludeCategory) => {
  if (excludeCategory && typeof excludeCategory === 'string') {
    posts = posts.filter(
      (post) => excludeCategory.toLowerCase() !== post.category.toLowerCase()
    );
  }

  if (quantity && typeof quantity === 'number') {
    posts = posts.slice(0, quantity);
  }

  let extraPosts = '';

  if (posts.length > MAX_TOP_POSTS) {
    extraPosts = html`<h2>Older posts</h2>
      <ul>
        ${posts
          .slice(MAX_TOP_POSTS, posts.length)
          .map((post) => {
            const { title, url, year, month, day } = post;

            return html`<li>
              ${Link({ to: url, content: title })} –
              <time pubdate datetime="${year}-${month}-${day}"
                >${year}/${month}/${day}</time
              >
            </li>`;
          })
          .join('\n')}
      </ul>`;
  }

  return html`<ul class="posts">
      ${posts
        .slice(0, MAX_TOP_POSTS)
        .map((post) => {
          const { title, description, url, year, month, day, category } = post;
          const dtf = new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          });
          const publishedData = new Date(`${year}/${month}/${day}`);
          const todayDate = new Date();
          const formattedDate = dtf.format(publishedData.getTime());
          const diffDays = parseInt(
            (todayDate - publishedData) / (1000 * 60 * 60 * 24),
            10
          );
          const displayDate =
            diffDays > 6
              ? `on ${formattedDate}`
              : diffDays === 0
                ? 'today'
                : `${diffDays} days ago`;

          let descriptionToUse = '';

          if (description) {
            descriptionToUse = `<p class="post-description">${description.replaceAll(
              /(&nbsp;|<([^>]+)>)/gi,
              ''
            )}</p>`;
          }

          return html` <li class="post">
            ${Link({
              to: url,
              className: 'post-link',
              content: html`
                <h2 class="post-title">${title}</h2>
                ${descriptionToUse}
              `
            })}

            <address class="post-meta">
              Skrevet av <a href="/">Rubinen</a> in
              ${Link({
                to: `/categories/${slugify(category.toLowerCase())}`,
                content: category
              })}
              <time pubdate datetime="${year}-${month}-${day}">
                &nbsp;• ${displayDate}
              </time>
            </address>
          </li>`;
        })
        .join('\n')}
    </ul>
    ${extraPosts}`;
};
