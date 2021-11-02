const { markdown } = require('./config/libraries');
const { formatter } = require('./config/transforms');
const { env } = require('./config/filters');
const {
  beforeCapture,
  capture,
  display,
  pagelink
} = require('./config/shortcodes');

module.exports = function (config) {
  config.on('beforeBuild', beforeCapture);
  config.addPairedShortcode('capture', capture);
  config.addShortcode('display', display);

  config.addShortcode('pagelink', pagelink);

  config.addFilter('env', env);

  config.addTransform('formatter', formatter);

  config.setLibrary('md', markdown);

  return {
    dir: {
      markdownTemplateEngine: 'njk',
      dataTemplateEngine: 'njk',
      htmlTemplateEngine: 'njk',
      input: 'src',
      output: 'dist',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
};
