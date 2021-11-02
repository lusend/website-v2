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
      symbol: '🔗',
      placement: 'before',
      space: true
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
  .use(markdownItContainer, 'test')
  .use(markdownItTOC);

module.exports = {
  markdown
};
