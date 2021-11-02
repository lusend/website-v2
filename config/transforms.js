const prettier = require('prettier/standalone');
const htmlParser = require('prettier/parser-html');
const jsParser = require('prettier/parser-babel');
const cssParser = require('prettier/parser-postcss');

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
  formatter
};
