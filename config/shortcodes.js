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

// create a link to another page from a certain collection
const pagelink = function (pageName, collections, collectionName = 'pages') {
  const currentCollection = collections[collectionName];
  const check = (item) =>
    item.fileSlug === pageName || item.data.slug === pageName;
  return currentCollection?.find(check)?.data?.path || '#';
};

module.exports = {
  beforeCapture,
  capture,
  display,
  pagelink
};