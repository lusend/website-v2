# LU Send Website

![](https://img.shields.io/github/workflow/status/lusend/website/Build%20and%20Release%20Website%20Files)
![](https://img.shields.io/github/v/release/lusend/website)
![](https://img.shields.io/github/stars/lusend/website?style=social)

> The LU Send Website uses [eleventy](https://github.com/11ty/eleventy) as a static site builder along with [prettier](https://github.com/prettier/prettier) for formatting, [postcss](https://postcss.org/), [tailwindcss](https://tailwindcss.com/), and [daisyui](https://daisyui.com/) for styles, [markdown-it](https://github.com/markdown-it/markdown-it) for markdown parsing, [semantic-release](https://github.com/semantic-release/semantic-release) and [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to automate versioning, and [github actions](https://github.com/features/actions) to automate builds.

## :wave: Table of Contents

- [:wave: Table of Contents](#wave-table-of-contents)
- [:computer: Development](#computer-development)
- [:pencil: Front Matter](#pencil-front-matter)
- [:lipstick: Styles](#lipstick-styles)
- [:keyboard: Shortcodes](#keyboard-shortcodes)
- [:bookmark: Markdown Plugins](#bookmark-markdown-plugins)

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

Every markdown file can include front matter elements. Front matter is defined at the top of a file using three `-` characters like so:

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

All front matter is accessible within the markdown template using double brackets:

```njk
{{ myvariable }}
```

Front matter can also be calculated. This section lists the manually defined as well as the predefined front matter elements that can be used.

> NOTE: Eleventy by default supplies certain data that does not need to be specified. View [its documentation](https://www.11ty.dev/docs/data-eleventy-supplied/) for more information.

### Manually Defined Front Matter

#### `layout`

A layout **must** be defined for each page. This is the only required front matter element. Currently, only two layouts are implemented: `brochure` and `page`.

```yaml
layout: page
```

#### `title`

A title is automatically formatted as the header for the page.

#### `styles`

styles can be included using the `styles` front matter. This is a way to include stylesheets within the `_includes` folder. Do not specify the extension, only the filename.

```yaml
styles: [styles, home]
```

#### `scripts`

scripts can be included using the `scripts` front matter. This is a way to include scripts within the `_includes` folder. Do not specify the extension, only the filename.

```yaml
scripts: [base, brochure]
```

#### `slug`

The slug allows you to override the outputted file link which defaults to the name of the page file. Thus, if a page was named `test.md` but the slug was set to `test2`, the link would direct to `test2` rather than `test`.

```yaml
slug: homepage
```

#### `tags`

The `tags` front matter allows you to create collections of pages. When using the `link` function, the collection `pages` is checked by default. Can either be a string or an array.

```yaml
tags: pages
```

OR

```yaml
tags: [pages, faq]
```

See [Eleventy documentation](https://www.11ty.dev/docs/data-eleventy-supplied/) for more details on tags. Note that a page should be given a tag if you ever want to link to it.

### Predefined Front Matter

#### `link`

To support links in both the dev server and production output, a front matter function called `link` exists. The function accepts 2 parameters, 1 of which is optional.

```njk
{{ link("filename of page or slug", "optional collection name") }}
```

1. `page`: The name of the page to link to. This can be found either by the filename or a slug if it is included for the page.
2. `collectionName`: The name of the collection with all the pages for the website. By default, set to "pages".

Here is an example:

```njk
[Click Here for Page X]({{ link("page-x") }})
```

This would generate a formatted link in markdown with the text "Click Here for Page X" hyperlinked to the actual page.

#### `path`

This is automatically calculated and can be used in files like so:

```njk
{{ path }}
```

This outputs the path to the file, and uses the environment (development or production) to detect which path to output.

#### `permalink`

This is very similar to path, but will also include the actual file name.

```njk
{{ permalink }}
```

For instance, for a `home.md` file in the root of the `src` directory, it would output `/home/home.html` in the development environment and `home.html` in the production environment.

## :lipstick: Styles

Post CSS and tailwindcss have been included. In fact, tailwindcss's @tailwindcss/typography plugin is included and can be used by using the `div` container with the class `prose` to generate default styles. Any tailwind style can be used, and only the styles used will actually appear in the build thanks to the jit compiler. View [tailwindcss's documentation](https://tailwindcss.com/docs) and [JIT page](https://tailwindcss.com/docs/just-in-time-mode) for more information.

Several Post CSS plugins have been included outside of tailwindcss as well. These plugins allow for the following:

- Import from other css files using relative urls
- Nesting in your css
- Autoprefixing

DaisyUI, a tailwindcss component library, has also been included. See the [daisyui documentation](https://daisyui.com/) for more information.

## :keyboard: Shortcodes

A few shortcodes have been made available to make certain functionality easier.

### `capture`

Capture is a paired shortcode that allows any code to be placed at the very beginning of a page. By default, styles are placed at the top. However, this allows you to override this by including some additional content before the styles.

```njk
{% capture "settings" %}
<script>
  // you will find this at the top of this page
</script>
{% endcapture %}
```

### `display`

Currently, only the "settings" capture is implemented by default to place content at the very beginning of the outputted file. However, the `display` shortcode can be used to display your own custom captures:

```njk
{% capture "custom" %}
Place me somewhere else!
{% endcapture %}

I appear first, even though I am not written first.

{% display "custom" %}
```

The above inserts the paragraph, "Place me somewhere else!" at the end of the document. Theoretically, you could use the `display` multiple times to repeat different elements.

### `cssprocessor`

This shortcode is an asynchronous paired shortcode that runs its content through the postcss processor. This is what allows nested CSS, automatic bundling of relative imports, tailwindcss along with daisyui, and autoprefixing to work.

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

### `div [class]`

This container wraps all content within a div with whatever follows afterwards.

```md
::: div prose
This is a test
:::
```

```html
<div class="prose"><p>This is a test</p></div>
```

> Note: `prose` is a special class that has been implemented to provide great typography defaults for written text. Use this block when written text is necessary.

### `markdown-it-toc-done-right`

This plugin generates a table of contents based on the headings in the file. It uses `markdown-it-anchor` under the hood to generate header anchors automatically.

```md
${toc}

## Sub heading

## Another sub heading

### A sub heading of the subheading

### Another one

### Definitely need to work on styling
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

Since heading 1 is not used, it automatically assumes that heading 2 is the top heading. This is perfect, as the front matter `title` is automatically converted into a heading 1. This means that all the headings can still look like subheadings though be primary in the table of contents.
