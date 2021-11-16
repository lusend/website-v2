const { markdown } = require('./config/libraries');
const { eleventyNavigation } = require('./config/plugins');
const { formatter, minifier } = require('./config/transforms');
const { postDate, env, log, yesno } = require('./config/filters');
const {
  beforeCapture,
  capture,
  display,
  cssprocessor,
  hero,
  button,
  testimonial,
  year,
  modal
} = require('./config/shortcodes');
const { NODE_ENV, TRANSFORM } = process.env;

module.exports = function (config) {
  config.on('beforeBuild', beforeCapture);
  config.addPairedShortcode('capture', capture);
  config.addPairedShortcode('hero', hero);
  config.addPairedShortcode('button', button);
  config.addPairedShortcode('testimonial', testimonial);
  config.addPairedShortcode('modal', modal);
  config.addShortcode('display', display);
  config.addShortcode('year', year);

  config.addPairedNunjucksAsyncShortcode('cssprocessor', cssprocessor);

  config.addFilter('postDate', postDate);
  config.addFilter('env', env);
  config.addFilter('log', log);
  config.addFilter('yesno', yesno);

  if (TRANSFORM) {
    const [first, second] = TRANSFORM.split(',');
    if (first === 'minify' || second === 'minify')
      config.addTransform(
        'minifier',
        minifier({ css: true, js: true, html: true })
      );
    if (first === 'format' || second === 'format')
      config.addTransform('formatter', formatter);
  } else if (NODE_ENV === 'development') {
    config.addTransform('formatter', formatter);
  } else {
    config.addTransform('minifier', minifier({ css: true, js: true }));
  }

  config.setLibrary('md', markdown);

  config.addPlugin(eleventyNavigation);

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'lib/includes',
      layouts: 'lib/layouts',
      data: 'lib/data'
    },
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
};
