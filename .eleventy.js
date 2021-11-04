const { markdown } = require('./config/libraries');
const { formatter, minifier } = require('./config/transforms');
const { env } = require('./config/filters');
const {
  beforeCapture,
  capture,
  display,
  cssprocessor
} = require('./config/shortcodes');

module.exports = function (config) {
  config.on('beforeBuild', beforeCapture);
  config.addPairedShortcode('capture', capture);
  config.addShortcode('display', display);

  config.addPairedNunjucksAsyncShortcode('cssprocessor', cssprocessor);

  config.addFilter('env', env);

  config.addTransform('minifier', minifier({ css: true, js: false }));
  config.addTransform('formatter', formatter);

  config.setLibrary('md', markdown);

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      layouts: '_layouts'
    },
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
};
