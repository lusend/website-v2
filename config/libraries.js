const markdownIt = require('markdown-it');
const markdownItSub = require('markdown-it-sub');
const markdownItSup = require('markdown-it-sup');
const markdownItEmoji = require('markdown-it-emoji');
const markdownItBracketedSpans = require('markdown-it-bracketed-spans');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItContainer = require('markdown-it-container');
const markdownItTOC = require('markdown-it-toc-done-right');

// add plugins to the markdown library
const markdown = markdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  typographer: true,
  linkify: true
})
  .use(markdownItSub)
  .use(markdownItSup)
  .use(markdownItEmoji)
  .use(markdownItBracketedSpans)
  .use(markdownItAttrs)
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      style: 'aria-labelledby',
      symbol:
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>',
      placement: 'before',
      space: false
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
  .use(markdownItContainer, 'div', {
    validate: (params) => params.trim().match(/^div\s+(.+)$/),
    render: (tokens, idx) => {
      if (tokens[idx].nesting === 1) {
        return `<div class="${markdownIt().utils.escapeHtml(
          tokens[idx].info.trim().match(/^div\s+(.+)$/)[1]
        )}">\n`;
      } else {
        return '</div>\n';
      }
    }
  })
  .use(markdownItContainer, 'test')
  .use(markdownItTOC, {
    containerClass: 'table-of-contents prose'
  });

module.exports = {
  markdown
};
