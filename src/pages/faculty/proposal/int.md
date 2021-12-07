---
layout: base
title: International Proposal Process
shortTitle: International Proposal Process
parent: Faculty Gateway
slug: intproposal
tags: pages
options:
  type: site
  planes: false
  header: true
  footer: true
  nav: true
  fullwidth: false
  background: false
  styles: [defaults]
  scripts: [datedriver]
---

::: div prose

Staff is available to consult with faculty in-person at any point in the proposal or development process. Email lusend@liberty.edu to connect today!

:::

::: section proposeinttop fullwidth autoheight

[Submit Trip Proposal](https://liberty.co1.qualtrics.com/jfe/form/SV_6WLZxhZxu6fhntc?BaseType=international){.simple-btn .text-xl}

:::

::: div prose

## International Proposal Deadlines

![Filler Header Image](https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=34515){.header}

All of the proposal dates are hard deadlines. Deadlines will appear in red 30 days out and be removed once they have passed.

<div id="intdates"></div>

## Trip Proposal Process

![Filler Header Image](https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=26354){.header}

As faculty, you are integrally involved in equipping Liberty students to be fully prepared to meet their futures in a globalizing marketplace. LU Send works with you to create cross-cultural opportunities that contribute to your students’ development as lifelong learners and Champions for Christ, wherever their journey takes them.

:::

::: section guides fullwidth autoheight

[Trip Leader
Handbook](https://liberty-sa.terradotta.com/_customtags/ct_FileRetrieve.cfm?File_ID=27452){.simple-btn} [Trip Leader Best
Practices Guide](https://liberty-sa.terradotta.com/_customtags/ct_FileRetrieve.cfm?File_ID=27453){.simple-btn}

:::

::: div prose

Please contact Audrey Hammond, Director of Academic Operations, by [email](mailto:agbeman@liberty.edu) or by phone (434-592-4204), to learn more about the proposal process.

LU Send will communicate the proposal’s approval status to the faculty/staff lead. Approved proposals will be moved into the trip development process.

## Development Process

![Filler Header Image](https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=26355){.header}

1. The Trip Coordinator assigned to your trip will meet with you to assess and finalize the specific logistical needs of your trip. This includes:
   - Trip itinerary
   - Budget & payment plan options
   - Flights & ground transportation
   - Participant training requirements
   - Promotion & recruiting strategies
   - Application personalization
   - Academic options & course registration strategy
   - Miscellaneous needs (passports/visas, insurance, background checks, specific vendor requirements, etc.)
2. The faculty/staff leader and the appropriate LU Send individuals will sign the Trip Agreement outlining the responsibilities of all involved parties.
3. After the Trip Agreement has been signed, promotion & recruiting for the trip can begin. Students will also be able to apply for the trip at this point.

## International Group Travel (Not University Sponsored)

![Filler Header Image](https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=21492){.header}

Any Faculty member participating in international group travel opportunities that are not related to the University but which do have Liberty University students attending (i.e. church mission trips) must be disclosed to LU Send no later than 3 weeks before travel. This short disclosure form can be found through the Faculty/Staff Resources Gateway on our website. In addition to registration, none of these international opportunities are to be presented or marketed to Liberty University students on campus without express written permission from LU Send.

:::

::: section notsponsored fullwidth autoheight

[Complete Non-University
Sponsored Registration](https://liberty.co1.qualtrics.com/jfe/form/SV_0Pd6ClKtZ0lF7xj){.simple-btn}

:::

::: section proposeintbtm fullwidth autoheight

[Submit Trip Proposal](https://liberty.co1.qualtrics.com/jfe/form/SV_6WLZxhZxu6fhntc?BaseType=international){.simple-btn .text-xl}

:::

!!!include(toc.md)!!!

<script>
  $(document).ready(function() {
    var datedriver = new DateDriver();
    datedriver.addDeadline([
      {
        date: '02/15',
        name: 'Spring Break',
        addYears: 1
      },
      {
        date: '04/30',
        name: 'Summer May/June',
        addYears: 1
      },
      {
        date: '05/30',
        name: 'Summer July/August',
        addYears: 1
      },
      {
        date: '10/01',
        name: 'Fall',
        addYears: 1
      },
      {
        date: '12/01',
        name: 'January/Early Spring',
        addYears: 2
      }
    ]);

    datedriver.displayDeadlines('intdates', {
      dateHeader: 'Trip Dates',
      deadlineHeader: 'Proposal Deadlines'
    });
  })
</script>
