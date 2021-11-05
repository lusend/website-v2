---
layout: page
title: Page Selector
key: Index
styles: [defaults]
---

::: div prose

<ul>
  {% for item in collections.pages %}
  <li><a href="{{ item.url }}">{{ item.data.title }}</a></li>
  {% endfor %}
  <li><a href="/brochure/">Brochure</a></li>
</ul>

:::
