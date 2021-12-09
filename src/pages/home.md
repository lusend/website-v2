---
layout: base
title: Home Page
shortTitle: Home
slug: home
parent: false
order: 0
tags: pages
options:
  type: site
  planes: true
  header: false
  footer: true
  nav: true
  fullwidth: true
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

:::: section #my-testimonials fullwidth autoheight light 0.7

# Testimonials

::: swiper #my-swiper-id
{% testimonial
  image="https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=22705",
  name="David Roten",
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

:::: section #lusend-buttons
::: grid 3
{% button
  image="https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=26354",
  title="Group Travel",
  link=link("map"),
  center=true,
  btnColor = 'primary',
  btnOutline = false,
  btnText = 'See More' %}
At LU Send, we want students, faculty, and alumni at Liberty to have the opportunity to see the world! Working with both the Office of Spiritual Development and the Office of the Provost, LU Send helps to craft a variety of experiential learning opportunities for students during their time at Liberty. Click below to find out about upcoming opportunities.
{% endbutton %}

{% button
  image="https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=21406",
  title="Individual Travel",
  link=link("bro"),
  center=true,
  btnColor = 'secondary',
  btnOutline = false,
  btnText = 'See More' %}
LU Send has partnered with trusted study abroad organizations and built connections with organizations in business to offer over 150 locations around the world! There is at least one study abroad location or internship opportunity for every field of study at Liberty. Increase your marketability, gain college credit, and prepare for life after graduation in a global setting!
{% endbutton %}

{% button
  image="https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=21405",
  title="Faculty Gateway",
  link=link("gateway"),
  center=true,
  btnColor = 'accent',
  btnOutline = false,
  btnText = 'See More' %}
Whether you are planning international travel or domestic travel, LU Send works with you to develop the educational, cultural, spiritual, and logistical components of your trip and to ensure exceptional experiences for every Liberty student traveling with the University. Click below to find out how faculty members can create trips for your students.
{% endbutton %}
:::
::::
