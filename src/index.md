---
layout: base
title: Page Selector
shortTitle: Index
author: P Christopher Bowers
date: false
# parent
# slug
# tags
options:
  type: site
  header: true
  footer: true
  nav: true
  fullwidth: false
  styles: [defaults]
  scripts: []
---

::: div prose

<ul>
  {% for item in collections.pages %}
  <li><a href="{{ item.url }}">{{ item.data.title }}</a></li>
  {% endfor %}
  <li><a href="/brochure/">Brochure</a></li>
</ul>

:::
