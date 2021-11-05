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
