const html = String.raw;

export const BodyScripts = () => {
  return html` <script src="/js/main.js"></script>
    <script>

          const yearsAgoElements = document.querySelectorAll('.years-ago');

          if(yearsAgoElements && yearsAgoElements.length !== 0){
            yearsAgoElements.forEach(element => {
              const year = element.getAttribute('data-year');

              if(year){
                element.textContent = ${'`'}${'$'}{year}, ${'$'}{new Date().getFullYear() - year} years ago${'`'};
              }
            })
          }


          const pubDateElements = document.querySelectorAll('.post-meta time[pubdate]');

          [...pubDateElements].forEach((el) => {
            const datetime = el.getAttribute('datetime');
            if(!datetime) return;
            const dtf = new Intl.DateTimeFormat('en', {
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            });
            const [year, month, day] = datetime.split('-');
            const publishedData = new Date('' + year + '/' + month + '/' + day + '');
            const todayDate = new Date();
            const formattedDate = dtf.format(publishedData.getTime());
            const diffDays = parseInt(
              (todayDate - publishedData) / (1000 * 60 * 60 * 24),
              10
            );
            const displayDate =
                  diffDays > 6
                    ? 'on  ' + formattedDate
                    : diffDays === 0
                      ? 'today'
                      : '' + diffDays + ' days ago';
            el.innerHTML = '&nbsp;• ' + displayDate;
          });

          const readTimeElement = document.querySelector('.read-time');

          if(readTimeElement){
            const article = document.querySelector('article');
            const baseReadTime = article.textContent.replaceAll('
      ','').trim().split(" ").length/265
            const imageReadTime = document.querySelectorAll('article img').length * 5 / 60
            // const codeReadTime = [...article.querySelectorAll('pre')].map(e => e.textContent.split(' ').length).reduce((a,b) => a + b, 0 ) / 265;
            const totalReadTime = Math.ceil(baseReadTime + imageReadTime);
            readTimeElement.textContent = ${'`'}• ${'$'}{totalReadTime} min read${'`'};
          }
    </script>`;
};
