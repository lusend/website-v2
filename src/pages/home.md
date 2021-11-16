---
layout: base
title: Home Page
shortTitle: Home
# slug
# parent
tags: pages
options:
  type: site
  header: false
  footer: true
  nav: true
  fullwidth: true
  planes: true
  background: https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=21409
  styles: [defaults]
  scripts: []
---

{% hero
  image="logo",
  darkbg=true,
  opacity=0.25,
  scrollid="testimonials"
%}
LU Send exists to train Champions for Christ to become global citizens through experiential learning and cultural engagement
{% endhero %}

:::: section #my-test fullwidth autoheight light 0.5

# Testimonials

::: swiper #my-swiper-id
{% testimonial
  image="https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=22705",
  name="Christian Lasvel",
  subtitle="Ecuador, Psychology"
%}
I am a 53 year-old student, and to say that my trip to Ecuador was life-changing should say it all. The lessons were outstanding, but the relationships I formed in the process added a missing ingredient that my online education was missing.
{% endtestimonial %}

{% testimonial
  image="https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=22706",
  name="Christian Lasvel",
  subtitle="Israel, FIRM Conference"
%}
I learned so much more about Israel from being there for 10 days than I could have if I had read about Israel for a whole month. In addition, the relationships that I developed over the course of my LU Send trip are ones that I will treasure for a lifetime!
{% endtestimonial %}

{% testimonial
  image="https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=22707",
  name="Sara Tschetter",
  subtitle="Rwanda, G5"
%}
Having the opportunity to go on an LU Send trip to Rwanda was one of the best experiences of my life. I loved learning about another culture and interacting with the people there. It has given me a fresh perspective on life that no picture could ever give.
{% endtestimonial %}
:::
::::

:::: section #test-lusend
::: grid 3
{% button
  image="https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=26354",
  title="Group Travel",
  link=link("map"),
  center=true,
  btnColor = 'primary',
  btnOutline = false,
  btnText = 'See More' %}
LU Send exists to train Champions for Christ to become global citizens through experiential learning and cultural engagement.
{% endbutton %}

{% button
  image="https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=26354",
  title="Individual Travel",
  link=link("bro"),
  center=true,
  btnColor = 'secondary',
  btnOutline = false,
  btnText = 'See More' %}
LU Send exists to train Champions for Christ to become global citizens through experiential learning and cultural engagement.
{% endbutton %}

{% button
  image="https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=26354",
  title="Faculty Gateway",
  link=link("bro"),
  center=true,
  btnColor = 'accent',
  btnOutline = false,
  btnText = 'See More' %}
LU Send exists to train Champions for Christ to become global citizens through experiential learning and cultural engagement.
{% endbutton %}
:::
::::
