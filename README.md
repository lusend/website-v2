# LU Send Website

![](https://img.shields.io/github/workflow/status/lusend/website/Build%20and%20Release%20Website%20Files)
![](https://img.shields.io/github/v/release/lusend/website)
![](https://img.shields.io/github/stars/lusend/website?style=social)

> The LU Send Website uses [eleventy](https://github.com/11ty/eleventy) as a static site builder along with [prettier](https://github.com/prettier/prettier) for formatting and [markdown-it](https://github.com/markdown-it/markdown-it) for markdown parsing, [semantic-release](https://github.com/semantic-release/semantic-release) and [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to automate versioning, and [github actions](https://github.com/features/actions) to automate builds.

## :wave: Table of Contents

- [:wave: Table of Contents](#wave-table-of-contents)
- [:computer: Development](#computer-development)
- [:pencil: Front Matter](#pencil-front-matter)
  - [`layout`](#layout)
  - [`title`](#title)
  - [`styles`](#styles)
  - [`scripts`](#scripts)
  - [`slug`](#slug)
  - [`tags`](#tags)
- [:lipstick: Styles](#lipstick-styles)
- [:keyboard: Shortcodes](#keyboard-shortcodes)
  - [`pagelink`](#pagelink)
  - [`capture`](#capture)
- [:bookmark: Markdown Plugins](#bookmark-markdown-plugins)
  - [`markdown-it-sub`](#markdown-it-sub)
  - [`markdown-it-sup`](#markdown-it-sup)
  - [`markdown-it-emoji`](#markdown-it-emoji)
  - [`markdown-it-bracketed-spans`](#markdown-it-bracketed-spans)
  - [`markdown-it-attrs`](#markdown-it-attrs)
  - [`markdown-it-container`](#markdown-it-container)
    - [`aside`](#aside)
  - [`markdown-it-toc-done-right`](#markdown-it-toc-done-right)

## :computer: Development

To begin developing this website, follow these steps:

1. Clone the repository

   ```bash
   git clone git@github.com:lusend/website.git
   ```

2. Enter the repository

   ```bash
   cd website
   ```

3. Install all dependencies

   ```bash
   npm install
   ```

Now that the repository is hosted on your local machine, you can begin editing files. To create a development server, run the following:

```bash
npm start
```

To generate the production files, run the following:

```bash
npm run build
```

> NOTE: As changes are made, use these commands to help ensure the correctness of the data. To trigger a new release and output of files, make sure to include `feat:` or `fix:` at the beginning of your commit statement, or the automatic versioning will not work.

## :pencil: Front Matter

Every markdown file can include the following front matter elements. Front matter is defined at the top of a file using three `-` characters like so:

```yaml
---
layout: page
title: This is my title
styles: [styles, homeStyles]
scripts: [base, home]
slug: home
tags: pages
---
```

All frontmatter is accessible within the markdown template using double brackets:

```njk
{{ myvariable }}
```

> NOTE: Eleventy by default supplies certain data that does not need to be specified. View [its documentation](https://www.11ty.dev/docs/data-eleventy-supplied/) for more information. `path` has also been provided which gives the url to the current page.

### `layout`

A layout must be defined for each page. Currently, only two layouts are implemented: `brochure` and `page`

```yaml
layout: page
```

### `title`

A title is automatically formatted as the header for the page.

### `styles`

styles can be included using the `styles` front matter. This is a way to include stylesheets within the `_includes` folder. Do not specify the extension, only the file name.

```yaml
styles: [styles, home]
```

### `scripts`

scripts can be included using the `scripts` front matter. This is a way to include scripts within the `_includes` folder. Do not specify the extension, only the file name.

```yaml
scripts: [base, brochure]
```

### `slug`

The slug allows you to override the outputted file link which defaults to the name of the page file. Thus, if a page was named `test.md` but the slug was set to `test2`, the link would direct to `test2` rather than `test`.

```yaml
slug: homepage
```

### `tags`

The `tags` front matter allows you to create collections of pages. When using the `pagelink` shortcode, the collection `pages` is checked by default. Can either be a string or an array.

```yaml
tags: pages
```

OR

```yaml
tags: [pages, faq]
```

See [Eleventy documentation](https://www.11ty.dev/docs/data-eleventy-supplied/) for more details on tags. Note that a page should be given a tag if you ever want to link to it.

## :lipstick: Styles

Post CSS and tailwindcss have been included. In fact, tailwindcss's @tailwind/typography plugin is included and all pages/brochures are wrapped by default in the `<div class="prose">` to generate default styles. Any tailwind style can be used, and only the styles used will actually appear in the build thanks to the jit compiler. View [tailwind's documentation](https://tailwindcss.com/docs) and [JIT page](https://tailwindcss.com/docs/just-in-time-mode) for more information.

Several Post CSS plugins have been included outside of tailwindcss as well. These plugins allow for the following:

- Import from other css files using relative urls
- Nesting in your css
- Autoprefixing

## :keyboard: Shortcodes

A few shortcodes have been made available to make certain functionality easier.

### `pagelink`

To support links in both the dev server and production output, a shortcode called `pagelink` exists. The shortcode accepts 3 parameters, 1 of which is optional

```njk
{% pagelink "file name of page or slug", collections, "optional collection name" %}
```

1. `pageName`: The name of the page to link to. This can be found either by the file name or a slug if it is included for the page.
2. `collections`: All of the collections created by the tags front matter. It is a pre-generated variable that must be passed to correctly create the link.
3. `collectionName`: The name of the collection with all the pages for the website. By default, set to "pages".

Here is an example:

```njk
[Click Here for Page X]({% pagelink "page-x", collections %})
```

This would generate a formatted link in markdown with the text "Click Here for Page X" hyperlinked to the actual page.

### `capture`

Capture is a paired shortcode that allows any code to be placed at the very beginning of a page. By default, styles are placed at the top. However, this allows you to override this by including some additional content before the styles.

```njk
{% capture "settings" %}
<script>
  // you will find this at the top of this page
</script>
{% endcapture %}
```

Currently, only the "settings" capture is implemented. However, the `display` shortcode can be used to display your own custom captures:

```njk
{% capture "custom" %}
Place me somewhere else!
{% endcapture %}

I appear first, even though I am not written first.

{% display "custom" %}
```

The above inserts the paragraph, "Place me somewhere else!" at the end of the document. Theoretically, you could use the `display` multiple times to repeat different elements.

## :bookmark: Markdown Plugins

Several markdown plugins have been included to make life somewhat easier.

> NOTE: If you are unfamiliar with markdown, take a look at the [basic syntax](https://www.markdownguide.org/basic-syntax/) or try the [tutorial](https://www.markdowntutorial.com/). These plugins are only a superset of regular markdown.

### `markdown-it-sub`

This plugin adds subscript to markdown.

```md
H~2~0
```

```html
<p>H<sub>2</sub>O</p>
```

### `markdown-it-sup`

This plugin adds superscript to markdown.

```md
29^th^
```

```html
<p>29<sup>th</sup></p>
```

### `markdown-it-emoji`

This plugin allows you to add github emojis using text surrounded by a colon. See [this page](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) for a full list of emojis.

```md
:muscle:
```

```html
<p>💪</p>
```

### `markdown-it-bracketed-spans`

This plugin allows you to create spans within paragraphs. This makes it easier to add attributes to specific text within a paragraph.

```md
This [is] a test.
```

```html
<p>This <span>is</span> a test.</p>
```

### `markdown-it-attrs`

This plugin allows you to add arbitrary attributes to content.

```md
_This_{.italic #myid data-test="test"} is a test
```

```html
<p><em class="italic" id="myid" data-test="test">This</em> is a test</p>
```

### `markdown-it-container`

This plugin allows you to create containers. As development continues, more containers will be implemented.

#### `aside`

This container places all content within an aside block.

```md
::: aside
This is a test
:::
```

```html
<aside><p>This is a test</p></aside>
```

### `markdown-it-toc-done-right`

This plugin generates a table of contents based on the headings in the file.

```md
${toc}
```

```html
<nav class="table-of-contents">
  <ol>
    <li><a href="#sub-heading"> Sub heading</a></li>
    <li>
      <a href="#another-subheading"> Another subheading</a>
      <ol>
        <li>
          <a href="#a-sub-heading-of-the-subheading">
            A sub heading of the subheading</a
          >
        </li>
        <li><a href="#another-one"> Another one</a></li>
        <li>
          <a href="#definitely-need-to-work-on-styling">
            Definitely need to work on styling</a
          >
        </li>
      </ol>
    </li>
  </ol>
</nav>
```
