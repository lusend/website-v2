const path = require('path');
const postcss = require('postcss');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const { NODE_ENV } = process.env;
let CAPTURES;

// set a before capture. Only necessary when in dev for watch/serve
const beforeCapture = function () {
  CAPTURES = {};
};

// capture content in a template
// paired shortcode
const capture = function (content, name) {
  if (!CAPTURES[this.page.inputPath]) CAPTURES[this.page.inputPath] = {};
  if (!CAPTURES[this.page.inputPath][name])
    CAPTURES[this.page.inputPath][name] = '';
  CAPTURES[this.page.inputPath][name] += content;
  return '';
};

// display content from a template
const display = function (name) {
  if (CAPTURES[this.page.inputPath] && CAPTURES[this.page.inputPath][name]) {
    return CAPTURES[this.page.inputPath][name];
  }

  return '';
};

// process post css
// paired shortcode
const cssprocessor = async function (content, file) {
  const rawFilepath = path.join(__dirname, `../src/_includes/${file}`);

  return await postcss([
    postcssNested,
    postcssImport,
    tailwindcss,
    autoprefixer
  ])
    .process(content, { from: rawFilepath })
    .then((res) => res.css.replace(/\:root/g, '').replace(/rem/g, 'em'));
};

module.exports = {
  beforeCapture,
  capture,
  display,
  cssprocessor
};
