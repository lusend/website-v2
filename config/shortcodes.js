const path = require('path');
const postcss = require('postcss');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const { markdown } = require('./libraries');
const { logo } = require('../src/lib/includes/snippets');

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
  CAPTURES[this.page.inputPath][name] += markdown.render(content);
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
  const rawFilepath = path.join(__dirname, `../src/lib/includes/${file}`);

  return await postcss([
    postcssNested,
    postcssImport,
    tailwindcss,
    autoprefixer
  ])
    .process(content, { from: rawFilepath })
    .then((res) => res.css.replace(/\:root/g, ''));
};

const hero = function (
  content,
  { image = 'logo', darkbg = true, opacity = 0.25, scrollid = '' }
) {
  const renderedContent = markdown.renderInline(content);
  return `<div class="hero min-h-[90vh] ${
    darkbg ? 'bg-black text-primary-content' : 'bg-base-100 text-base-content'
  }" style="--tw-bg-opacity: ${opacity};">
  <div class="flex flex-col items-center text-center w-3/4 hero-content">
  ${image === 'logo' ? logo : `<img src="${image}" />`}
  <p class="mb-5">
    ${renderedContent}
  </p>
  <a href="#${scrollid}"><i class="fa fa-chevron-down animate-bounce text-5xl" aria-hidden="true"></i></a>
  </div>
  </div>`;
};

const possibleButtons = [
  'btn-primary',
  'btn-secondary',
  'btn-accent',
  'btn-ghost',
  'btn-link',
  'btn-info',
  'btn-warning',
  'btn-error',
  'btn-success',
  'glass'
];

const button = function (
  content,
  {
    image = '',
    title = '',
    link = '',
    center = true,
    btnColor = 'primary',
    btnOutline = false,
    btnText = 'Click Here'
  }
) {
  const renderedContent = markdown.renderInline(content);
  btnColor =
    possibleButtons.find((btn) => btn.includes(btnColor)) || 'btn-primary';
  btnOutline = btnOutline ? 'btn-outline' : '';
  center = center ? 'text-center' : '';

  return `<div class="card min-h-[60vh] shadow-xl ${center} image-full">
  <figure>
  <img src="${image}" alt="Card Background" />
  </figure> 
  <div class="justify-start justify-items-center card-body" style="backdrop-filter: blur(4px);">
  <h2 class="text-3xl card-title flex-none">${title}</h2> 
  <p class="flex-1">${renderedContent}</p> 
  <div class="card-actions flex-none">
  <a class="btn ${btnColor} ${btnOutline} btn-block whitespace-normal leading-5 m-0" href="${link}">${btnText}</a>
  </div>
  </div>
  </div>`;
};

const testimonial = function (
  content,
  { image = '', name = '', subtitle = '' }
) {
  const renderedContent = markdown.renderInline(content);

  return `<div class="swiper-slide max-w-md flex flex-col items-center py-2">
  <div class="w-20 h-20 shadow-2xl -mb-7 z-10 rounded-full m-0 p-0 overflow-hidden">
  <img class="mask mask-circle" src="${image}" alt="Testimonial Picture" />
  </div> 
  <div class="card bg-base-100 shadow-lg">
  <div class="card-body">
  <div class="max-w-sm">
  <div class="text-3xl text-secondary text-left leading-tight h-3">“</div>
  <p class="text-sm text-base-content text-center px-5 -mt-1">${renderedContent}</p>
  <div class="text-3xl text-secondary text-right leading-tight h-3 -mt-3">”</div>
  <p class="text-lg text-primary font-bold text-center mt-5 ">${name}</p>
  <p class="text-xs text-primary text-center">${subtitle}</p>
  </div>
  </div>
  </div>
  </div>`;
};

const modal = function (
  content,
  {
    name = '',
    center = true,
    btnCenter = true,
    btnColor = 'primary',
    btnOutline = false,
    btnBlock = false,
    btnText = 'Click Here'
  }
) {
  const renderedContent = markdown.render(content);
  name = !name ? Date.now() : name;
  btnColor =
    possibleButtons.find((btn) => btn.includes(btnColor)) || 'btn-primary';
  btnOutline = btnOutline ? 'btn-outline' : '';
  btnBlock = btnBlock ? 'btn-block' : '';
  btnCenter = btnCenter ? 'text-center' : '';
  center = center ? 'text-center' : 'text-left';

  return `<div class='w-full ${btnCenter}'>
  <label for="${name}" class="btn ${btnColor} ${btnBlock} ${btnOutline} modal-button">${btnText}</label>
  <input type="checkbox" id="${name}" class="modal-toggle">
  <div class="modal">
  <div class="modal-box max-h-[70%] overflow-y-auto ${center}">
  ${renderedContent}
  <div class="modal-action">
  <label for="${name}" class="btn ${btnColor} ${btnOutline}">Close</label>
  </div>
  </div>
  </div>
  </div>`;
};

const year = () => `${new Date().getFullYear()}`;

module.exports = {
  beforeCapture,
  capture,
  display,
  cssprocessor,
  hero,
  button,
  testimonial,
  year,
  modal
};
