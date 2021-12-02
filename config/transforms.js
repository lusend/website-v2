const htmlMinifier = require('html-minifier');

const prettier = require('prettier/standalone');
const htmlParser = require('prettier/parser-html');
const jsParser = require('prettier/parser-babel');
const cssParser = require('prettier/parser-postcss');

// minify html, css, and js
const minifier = ({ css = true, js = true, html = true }) =>
  function (content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      if (this?.frontMatter?.data?.options?.type === 'brochure')
        content = formatter(content, outputPath);

      let formatted = htmlMinifier.minify(content, {
        removeComments: true,
        minifyCSS: css,
        minifyJS: !!js ? { quote_style: 1 } : false,
        collapseWhitespace: html,
        collapseBooleanAttributes: html,
        quoteCharacter: "'",
        ignoreCustomFragments: [
          /<!--ignoreminify-->[\s\S]*?<!--endignoreminify-->/,
          /&nbsp;/
        ]
      });

      return formatted;
    }
    return content;
  };

// format html, css, and js
const formatter = function (content, outputPath) {
  if (outputPath && outputPath.endsWith('.html')) {
    let formatted = prettier.format(content, {
      embeddedLanguageFormatting: 'auto',
      parser: 'html',
      plugins: [htmlParser, jsParser, cssParser],
      semi: true,
      singleQuote: true,
      useTabs: false,
      trailingComma: 'none'
    });
    return formatted;
  }
  return content;
};

module.exports = {
  minifier,
  formatter
};
