const markdownIt = require('markdown-it');
const markdownItInclude = require('markdown-it-include');
const markdownItSub = require('markdown-it-sub');
const markdownItSup = require('markdown-it-sup');
const markdownItEmoji = require('markdown-it-emoji');
const markdownItBracketedSpans = require('markdown-it-bracketed-spans');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItContainer = require('markdown-it-container');
const markdownItTOC = require('markdown-it-toc-done-right');

const possibleCols = [
  'lg:grid-cols-1',
  'lg:grid-cols-2',
  'lg:grid-cols-3',
  'lg:grid-cols-4',
  'lg:grid-cols-5',
  'lg:grid-cols-6',
  'lg:grid-cols-7',
  'lg:grid-cols-8',
  'lg:grid-cols-9',
  'lg:grid-cols-10',
  'lg:grid-cols-11',
  'lg:grid-cols-12'
];

const swiperSettings = (id) => `
<script>
  $( document ).ready(function() {
    const swiper = new Swiper("#${id}", {
      centeredSlides: true,
      initialSlide: 1,
      loop: true,
      grabCursor: true,
      loopedSlides: 10,
      speed: 10000,
      slidesPerView: "auto",
      spaceBetween: 30,
      freeMode: {
        enabled: true,
        sticky: true
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
      }
    });
  })
</script>
`;

// add plugins to the markdown library
const markdown = markdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  typographer: true,
  linkify: true
})
  .use(markdownItInclude, './src/lib/layouts')
  .use(markdownItSub)
  .use(markdownItSup)
  .use(markdownItEmoji)
  .use(markdownItBracketedSpans)
  .use(markdownItAttrs)
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink({
      class: 'header-anchor'
    }),

    leveL: 6
  })
  .use(markdownItContainer, 'aside', {
    validate: (params) => params.trim() === 'aside',
    render: (tokens, idx) => {
      if (tokens[idx].nesting === 1) {
        return `<aside>\n`;
      } else {
        return '</aside>\n';
      }
    }
  })
  .use(markdownItContainer, 'section', {
    validate: (params) => params.trim().match(/^section\s+(.+)$/),
    render: (tokens, idx) => {
      if (tokens[idx].nesting === 1) {
        let [id, fullwidth, autoheight, bgtype, opacity, classes] = markdownIt()
          .utils.escapeHtml(
            tokens[idx].info.trim().match(/^section\s+(.+)$/)[1]
          )
          .split(' ');

        if (id.startsWith('#')) id = `id="${id.substring(1)}"`;
        classes = classes
          ? Array.isArray(classes)
            ? classes.join(' ')
            : classes
          : '';

        if (bgtype === 'dark') bgtype = 'bg-black text-primary-content';
        else if (bgtype === 'light') bgtype = 'bg-white text-primary';
        else bgtype = '';

        opacity = `style="--tw-bg-opacity: ${opacity};"`;

        return `<div class="${
          autoheight === 'autoheight' ? 'section min-h-0' : 'section'
        } ${
          fullwidth === 'fullwidth' ? '' : 'max-wrapper'
        } ${bgtype} ${classes}" ${id} ${opacity}>\n`;
      } else {
        return '</div>\n';
      }
    }
  })
  .use(markdownItContainer, 'grid', {
    validate: (params) => params.trim().match(/^grid\s+(.+)$/),
    render: (tokens, idx) => {
      if (tokens[idx].nesting === 1) {
        let [cols, classes] = markdownIt()
          .utils.escapeHtml(tokens[idx].info.trim().match(/^grid\s+(.+)$/)[1])
          .split(' ');

        cols = cols
          ? possibleCols.find((c) => c.includes(cols))
          : 'lg:grid-cols-3';

        classes = classes
          ? Array.isArray(classes)
            ? classes.join(' ')
            : classes
          : '';

        return `<div class="grid p-2 gap-6 justify-center ${cols} ${classes}">\n`;
      } else {
        return '</div>\n';
      }
    }
  })
  .use(markdownItContainer, 'swiper', {
    validate: (params) => params.trim().match(/^swiper\s+(.+)$/),
    render: (tokens, idx) => {
      if (tokens[idx].nesting === 1) {
        let [id, classes] = markdownIt()
          .utils.escapeHtml(tokens[idx].info.trim().match(/^swiper\s+(.+)$/)[1])
          .split(' ');

        if (id.startsWith('#')) id = id.substring(1);
        classes = classes
          ? Array.isArray(classes)
            ? classes.join(' ')
            : classes
          : '';

        return `<link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css" />\n<script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>\n${swiperSettings(
          id
        )}\n<div ${
          id ? `id="${id}"` : ''
        } class="swiper w-full h-full py-5 ${classes}">\n<div class="swiper-wrapper">\n`;
      } else {
        return `</div>\n</div>\n`;
      }
    }
  })
  .use(markdownItContainer, 'div', {
    validate: (params) => params.trim().match(/^div\s+(.+)$/),
    render: (tokens, idx) => {
      if (tokens[idx].nesting === 1) {
        let options = markdownIt()
          .utils.escapeHtml(tokens[idx].info.trim().match(/^div\s+(.+)$/)[1])
          .split(' ');

        let id = '';
        if (options[0].startsWith('#'))
          id = `id="${options.shift().substring(1)}"`;

        let classes = '';
        if (options.length) classes = `class="${options.join(' ')}"`;

        return `<div ${id} ${classes}>\n`;
      } else {
        return '</div>\n';
      }
    }
  })
  .use(markdownItTOC, {
    containerClass: 'table-of-contents',
    level: [1, 2, 3]
  });

module.exports = {
  markdown
};
