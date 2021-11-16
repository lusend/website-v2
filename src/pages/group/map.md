---
layout: base
title: Group Travel
shortTitle: Group Travel
slug: map
parent: Home
tags: pages
options:
  type: site
  header: false
  footer: true
  nav: true
  fullwidth: true
  # background: https://liberty-sa.terradotta.com/_customtags/ct_Image.cfm?Image_ID=21409
  styles: [defaults, map]
  scripts: [map]
---

<style>
  #mapsearchwrapper {
    position: relative;
    height: 700px;
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  #mapsearchwrapper #select.select {
    opacity: 1;
    position: absolute;
    overflow-y: auto;
    top: 0;
    left: 0;
    width: 65%;
    height: 100%;
    padding: 40px 10px 10px 10px;
    background: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    z-index: 2;
    -webkit-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
  }
  #mapsearchwrapper #googlemap {
    position: absolute;
    background: #d6d6d6;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    color: #000000;
    font-size: 48px;
    z-index: 0;
  }
  #mapsearchwrapper #list.list {
    opacity: 1;
    position: absolute;
    overflow-y: auto;
    top: 0;
    left: 0;
    width: 65%;
    height: 100%;
    padding: 40px 10px 10px 10px;
    background: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    z-index: 2;
    -webkit-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
  }
  #mapsearchwrapper #link {
    position: absolute;
    width: 65%;
    top: 0;
    height: 30px;
    padding: 0;
    margin: 0;
    z-index: 3;
    background: #171717;
    -webkit-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
  }
  #mapsearchwrapper button:focus {
    outline: 0;
  }
  #easter {
    pointer-events: none;
  }
  #mapsearchwrapper #link button {
    display: inline-block;
    text-align: center;
    font-weight: bold;
    font-size: 1.5em;
    margin-right: 5px;
    height: 30px;
    padding: 0 10px;
    color: #ffffff;
    background: none;
    border: none;
    border-bottom: 1px solid #ffffff;
  }
  #mapsearchwrapper button#minimize {
    display: block;
    position: absolute;
    left: 65%;
    margin-left: 30px;
    margin-top: 45px;
    height: 30px;
    padding: 0 15px;
    text-align: center;
    font-size: 1.5em;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.7);
    -webkit-transform-origin: 0 0;
    -moz-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    -o-transform-origin: 0 0;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    border: none;
    z-index: 4;
    -webkit-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
  }
  #mapsearchwrapper #link button:hover {
    background: #333333;
    text-decoration: none;
  }
  #mapsearchwrapper #select.opacity-hidden {
    opacity: 0;
    z-index: 1;
    pointer-events: none;
    -webkit-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
  }
  #mapsearchwrapper #list.opacity-hidden {
    opacity: 0;
    z-index: 1;
    pointer-events: none;
    -webkit-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
  }
  #mapsearchwrapper #select.width-hidden {
    width: 0;
    opacity: 0;
    padding: 0;
    margin: 0;
    z-index: -1;
    pointer-events: none;
    -webkit-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
  }
  #mapsearchwrapper #link.width-hidden {
    width: 0;
    opacity: 0;
    padding: 0;
    margin: 0;
    z-index: -1;
    pointer-events: none;
    -webkit-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
  }
  #mapsearchwrapper #list.width-hidden {
    width: 0;
    opacity: 0;
    padding: 0;
    margin: 0;
    z-index: -1;
    pointer-events: none;
    -webkit-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
  }
  #mapsearchwrapper #minimize.minimize-hidden {
    left: 0;
    -webkit-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
  }
  @media (min-width: 780px) {
    #mapsearchwrapper #list.short {
      width: 35%;
    }
    #mapsearchwrapper #link.short {
      width: 35%;
    }
    #mapsearchwrapper #minimize.short {
      left: 35%;
    }
  }
</style>

<div id="mapsearchwrapper">
  <div id="google-map"></div>
  <button id="map-minimize" class="ml-[30px] bg-white py-0 px-4 text-lg" onclick="changeDisplay()">+</button>
  <div id="programList"></div>
  <div class="search-wrapper">
    <select
      id="map-select1"
      class="select hide"
      onchange="changeSearchCriteria(this)"
    >
      <option value="">All</option>
    </select>
    <div id="map-loading">Loading Search...</div>
    <button
      class="btn btn-primary hide"
      id="searchSubmit"
      onclick="createSearchCall()"
    >
      Submit</button
    ><br />
    <select
      id="map-search1"
      class="search hide"
      multiple="true"
      size="1"
    ></select
    ><br />
    <button
      class="btn btn-primary hide preMadeSubmit"
      id="allSubmit"
      onclick="createSearchCall('all')"
    >
      All<br />Trips
    </button>
    <button
      class="btn btn-primary hide preMadeSubmit"
      id="genedSubmit"
      onclick="createSearchCall('gened')"
    >
      GenEd<br />Trips
    </button>
    <button
      class="btn btn-primary hide preMadeSubmit"
      id="g5Submit"
      onclick="createSearchCall('domestic')"
    >
      Domestic<br />Trips
    </button>
    <div id="map-message">&nbsp;</div>
  </div>
</div>
