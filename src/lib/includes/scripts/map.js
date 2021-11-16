/*
    THINGS TO THINK ABOUT IF SWITCHING MAP:
    - Home Button
    - PreSearch Buttons
    - MAP_TYPE
    - PARAMETER_IDS
    - PRE_SEARCH
  */

var MAP_TYPE = 'Faculty-Led Programs', //programs available in this search
  PARAMETER_IDS = [
    //all the parameters available in this search
    '11010', //courses
    '11034', //schools
    '11035', //departments
    '11029' //terms
  ],
  // var MAP_TYPE = "LU Serve", //programs available in this search
  //   PARAMETER_IDS = [ //all the parameters available in this search
  //   "11029", //terms
  //   "11036", //durations
  //   ],

  GEN_EDS = [
    'ENGL 101',
    'COMS 101',
    'ENGR 270',
    'GLST 220',
    'SCOM 110',
    'MATH 114',
    'MATH 115',
    'MATH 117',
    'MATH 121',
    'MATH 122',
    'MATH 125',
    'MATH 126',
    'MATH 128',
    'MATH 130',
    'MATH 131',
    'MATH 132',
    'MATH 201',
    'MATH 211',
    'MATH 217',
    'MATH 227',
    'BIOL 101',
    'BIOL 102',
    'BIOL 103',
    'BIOL 104',
    'BIOL 203',
    'BIOL 213',
    'BIOL 214',
    'BIOL 215',
    'BIOL 216',
    'BIOL 224',
    'CHEM 105',
    'CHEM 107',
    'CHEM 121',
    'CHEM 122',
    'ENVR 215',
    'ENVR 220',
    'ENVR 221',
    'PHSC 121',
    'PHSC 122',
    'PHSC 210',
    'PHSC 211',
    'PHYS 101',
    'PHYS 103',
    'PHYS 201',
    'PHYS 202',
    'PHYS 231',
    'PHYS 232',
    'BUSI 201',
    'INFT 102',
    'INFT 103',
    'INFT 104',
    'INFT 110',
    'INFT 126',
    'INFT 127',
    'INFT 151',
    'INFT 152',
    'INFT 241',
    'UNIV 101',
    'INQR 101',
    'ARTS 209',
    'ENGL 102',
    'MUSC 200',
    'CSIS 110',
    'CSIS 111',
    'CSIS 112',
    'GEOG 200',
    'HIEU 201',
    'HIEU 202',
    'HLTH 216',
    'HIUS 221',
    'HIUS 223',
    'HIUS 222',
    'HIUS 341',
    'HIUS 360',
    'HIUS 380',
    'HIWD 370',
    'RSCH 201',
    'ARTS 205',
    'ARTS 214',
    'ENGL 201',
    'ENGL 202',
    'ENGL 215',
    'ENGL 216',
    'ENGL 221',
    'ENGL 222',
    'MUSC 213',
    'MUSC 314',
    'MUSC 371',
    'BIBL 105',
    'BIBL 110',
    'EVAN 101',
    'RLGN 105',
    'THEO 201',
    'THEO 202',
    'APOL 201',
    'ARTS 105',
    'CINE 101',
    'CSTU 101',
    'CSTU 102',
    'GLST 290',
    'MUSC 103',
    'MUSC 311',
    'MUSC 312',
    'MUSC 313',
    'THEA 101',
    'YOUT 220',
    'BUSI 223',
    'BUSI 240',
    'ECON 110',
    'ECON 213',
    'ECON 214',
    'GOVT 200',
    'GOVT 210',
    'GOVT 220',
    'PSYC 101',
    'PSYC 150',
    'PSYC 210',
    'SOCI 200',
    'SOCI 201',
    'PHIL 201',
    'BWVW 301',
    'CINE 340',
    'CSTU 301',
    'CSTU 310',
    'ENGL 405',
    'ENGL 442',
    'ENGL 460',
    'ENGL 462',
    'ETHM 411',
    'GEOG 410',
    'HIEU 466',
    'HLTH 400',
    'INDS 499',
    'MUSC 424',
    'NASC 315',
    'PHIL 429',
    'PHIL 465',
    'PHIL 468',
    'PHSC 310',
    'SPAN 324',
    'THEO 324',
    'THEO 340',
    'CSER'
  ];

var SEARCH_LOAD = 0, //add 1 to SEARCH_LOAD every time api is called before searching
  SEARCH_LOADED = 0, //loadSearch adds 1 here once an item is loaded
  MAP_LOAD = 1, //add 1 to MAP_LOAD every time api is called after searching (starts with 1 due to map load)
  MAP_LOADED = 0; //loadMap adds 1 here once an item is loaded
(SEARCH_READY = false), (PRE_SEARCH = false);
// PRE_SEARCH = "gened";
// PRE_SEARCH = "all";
// PRE_SEARCH = "g5";
// PRE_SEARCH = "some-link";

var SEARCH_CRITERIA = {}, //contains all the searchable criteria
  SEARCH_RESULTS = {}, //contains all the search results
  CURRENT_SEARCH_CRITERIA = []; //contains the searchable criteria being used currently

var API_KEY = 'AIzaSyBcNbHG1bp2W6CQ1j6Ylp-hfv1E7qE6hZk', //the google API Key
  // var API_KEY = "AIzaSyAbmsEtkMyYyjFYiAD4H46rDiayhPFl5Xg", //the google API Key
  MAX_ZOOM = 9,
  WORLD_MAP,
  OMS,
  MARKER_CLUSTERER;

var LINK_VARIABLES = '';

function gm_authFailure() {
  document.getElementById('google-map').style.innerHTML = 'Map Unsupported';
}

function changeDisplay(show) {
  $('#map-minimize').css('display', 'block');
  if (show === undefined) {
    $('#map-minimize').toggleClass('show');
    $('#map-minimize').html($('#map-minimize').html() === '+' ? '-' : '+');
    $('#programList').toggleClass('show');
    $('#map-program-list').toggleClass('show');
  } else if (show) {
    $('#map-minimize').addClass('show');
    $('#map-minimize').html('-');
    $('#programList').addClass('show');
    $('#map-program-list').addClass('show');
  } else {
    $('#map-minimize').removeClass('show');
    $('#map-minimize').html('+');
    $('#programList').removeClass('show');
    $('#map-program-list').removeClass('show');
  }
}

function setMessage(message) {
  $('#map-message').css('display', 'block');
  $('#map-message').html(message);
}

function composedPath(el) {
  var path = [];
  while (el) {
    path.push(el);
    if (el.tagName === 'HTML') {
      path.push(document);
      path.push(window);
      return path;
    }
    el = el.parentElement;
  }
}

function createIESupport() {
  if (!Object.keys) {
    Object.keys = function (obj) {
      var keys = [];
      for (var i in obj) {
        keys.push(i);
      }
      return keys;
    };
  }

  if (!Object.values) {
    Object.values = function (obj) {
      var values = [];
      for (var i in obj) {
        values.push(obj[i]);
      }
      return values;
    };
  }
}

function filterUnique(val, i, arr) {
  //filters out any non-unique values from array
  return (
    arr
      .map(function (j) {
        return j.value;
      })
      .indexOf(val.value) === i
  );
}

function isOnId(path, id) {
  return path.some(function (element) {
    return element.id === id;
  });
}

function loadSearch(title) {
  console.log(title.replace(/^.{1}/g, title[0].toUpperCase()) + ' loaded.');
  if (SEARCH_LOADED + 1 >= SEARCH_LOAD) {
    //all apis loaded
    SEARCH_LOADED++;
    buildOms();
    buildMarkerClusterer();
    showSearch();
    console.log('**Ready to Search**');
    if (PRE_SEARCH) createSearchCall(PRE_SEARCH);
  } else {
    //apis are still needed
    SEARCH_LOADED++;
  }
}

function loadMap(title, searchReady) {
  if (searchReady) SEARCH_READY = true;
  console.log(title.replace(/^.{1}/g, title[0].toUpperCase()) + ' loaded.');
  if (MAP_LOADED + 1 >= MAP_LOAD && SEARCH_READY) {
    MAP_LOADED++;
    SEARCH_READY = false;
    clearMap();
    addMarkers();
    var programText = SEARCH_RESULTS.total === 1 ? 'Program' : 'Programs';
    setMessage('<b>' + SEARCH_RESULTS.total + '</b> ' + programText);
    addList();
    changeDisplay(true);
  } else {
    MAP_LOADED++;
  }
}

function loadScript(url, type, loadMessage) {
  SEARCH_LOAD++;
  var item = document.createElement(type);
  item.onload = function () {
    loadSearch(loadMessage);
  };
  if (type === 'script') {
    item.src = url;
    item.type = 'text/javascript';
    item.defer = true;
    item.async = true;
  } else if (type === 'link') {
    item.rel = 'stylesheet';
    item.type = 'text/css';
    item.href = url;
  }
  document.getElementsByTagName('head')[0].appendChild(item);
}

function encodeSearchValue(value) {
  return (
    encodeURIComponent(value).replace(/"/g, '%22').replace(/'/g, '%27') + '%7F'
  );
}

function createSearchCall(preMadeClick) {
  setMessage('<i>Searching...</i>');

  var link =
    'https://liberty-sa.terradotta.com/piapi/index.cfm?callName=getProgramSearchResults&ResponseEncoding=JSON&callBackName=getSearch&jsoncallback=?';
  var customLink = false;
  var params = '';
  var selectionArray = [
    {
      id: 'p_11009',
      type: 'SELCT',
      value: encodeSearchValue(MAP_TYPE)
    }
  ];

  if (preMadeClick === undefined) {
    $('#map-search1 option:selected').each(function () {
      var index = CURRENT_SEARCH_CRITERIA.map(function (i) {
        return i.value;
      }).indexOf($(this).val());
      var meta = SEARCH_CRITERIA[CURRENT_SEARCH_CRITERIA[index].optgroup];
      var isParameter = meta.hasOwnProperty('type');

      if (!isParameter) meta.type = '';

      selectionArray.push({
        id: meta.id,
        value: encodeSearchValue($(this).val()),
        type: meta.type
      });
    });
  } else {
    if (preMadeClick === 'gened') {
      for (var gened in GEN_EDS) {
        selectionArray.push({
          id: 'p_11010',
          value: encodeSearchValue(GEN_EDS[gened]),
          type: 'MULTI'
        });
      }
    } else if (preMadeClick === 'domestic') {
      selectionArray.push({
        id: 'country',
        value: 'United States',
        type: ''
      });
    } else if (preMadeClick !== 'all') {
      customLink = preMadeClick;
    }
  }

  if (!customLink) {
    selectionArray = selectionArray.sort(function (a, b) {
      if (a.id.toLowerCase() < b.id.toLowerCase()) return -1;
      if (a.id.toLowerCase() > b.id.toLowerCase()) return 1;
      return 0;
    });

    var firstOfType = true;
    for (var index = 0; index < selectionArray.length; index++) {
      var current = selectionArray[index];
      var next = selectionArray[index + 1];

      var atEnd = index + 1 >= selectionArray.length; //there is no next index

      if (current.type !== '') {
        //parameter
        if (params === '') params += '&params='; //add if first ever parameter
        if (firstOfType) {
          //new parameter found
          if (params !== '&params=') params += '|'; //add pipe character if not first ever parameter
          params += current.id + '=' + current.value;
        } else params += ',' + current.value; //add value
        if ((!atEnd && next.id != current.id) || atEnd)
          params += '|' + current.id + '_t=' + current.type; //end parameter with type
      } else {
        //other
        if (firstOfType) link += '&' + current.id + '=' + current.value;
        //add value and id
        else link += ',' + current.value; //just add value
      }

      if (!atEnd && current.id !== next.id) firstOfType = true;
      //set firstOfType
      else firstOfType = false;
    }

    SEARCH_RESULTS.link = link + params;
  } else {
    SEARCH_RESULTS.link = customLink;
  }

  var newLink =
    window.location.origin +
    window.location.pathname +
    LINK_VARIABLES +
    '&preload=' +
    encodeSearchValue(SEARCH_RESULTS.link);
  window.history.pushState({ reload: newLink }, 'Search', newLink);

  MAP_LOAD++;
  $.getJSON(SEARCH_RESULTS.link);
}

function _cb_getSearch(data) {
  var total = data.ROWCOUNT;
  var verbiage = data.SEARCHVERBIAGE.replace(
    /(You searched for )Outgoing (.*), sorted by <b> Program Name ,  Program City ,  Program Country ,  Program Region <\/b> in <b>ascending<\/b> order./g,
    '$1$2'
  );
  var actualTotal = data.RECORDCOUNT;
  if (total > 1) data = data.PROGRAM;
  else
    data = {
      1: data.PROGRAM
    };

  manipulateSearchResults(data, actualTotal, verbiage);
  loadMap(verbiage + '(' + SEARCH_RESULTS.link + ')', true);
}

function loadScripts() {
  loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.6/js/standalone/selectize.min.js',
    'script',
    'selectize script'
  );
  loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.6/css/selectize.bootstrap3.min.css',
    'link',
    'selectize stylesheet'
  );
  loadScript(
    'https://maps.googleapis.com/maps/api/js?key=' +
      API_KEY +
      '&callback=buildMap',
    'script',
    'map script'
  );
  loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/js-marker-clusterer/1.0.0/markerclusterer_compiled.js',
    'script',
    'marker clusterer script'
  );
  loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/OverlappingMarkerSpiderfier/1.0.3/oms.min.js',
    'script',
    'marker spiderfier script'
  );
}

function changeSearchCriteria(element) {
  var selectize = $('#map-search1').selectize(CURRENT_SEARCH_CRITERIA)[0]
    .selectize;
  setSearchCriteria(element.value);
  selectize.clear();
  selectize.clearOptions();
  selectize.addOption(CURRENT_SEARCH_CRITERIA);
  selectize.refreshOptions(CURRENT_SEARCH_CRITERIA);
  var type = element.value !== '' ? element.value + ' ' : 'Any Trips';
  $('.selectize-input input[placeholder]').attr(
    'placeholder',
    'Search For ' + type
  );
}

function setSearchCriteria(groupChosen) {
  CURRENT_SEARCH_CRITERIA = [];
  for (var group in SEARCH_CRITERIA) {
    group = groupChosen || group; //set group to chosen group if necessary
    CURRENT_SEARCH_CRITERIA = CURRENT_SEARCH_CRITERIA.concat(
      SEARCH_CRITERIA[group].data
    );
    if (groupChosen !== undefined && groupChosen !== '') break; //break loop if any isn't chosen
  }
}

function buildOms() {
  var omsoptions = {
    markersWontMove: true,
    markersWontHide: true,
    keepSpiderfied: true
  };

  OMS = new OverlappingMarkerSpiderfier(WORLD_MAP, omsoptions);
}

function buildMarkerClusterer() {
  var mcoptions = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    maxZoom: MAX_ZOOM - 1
  };
  MARKER_CLUSTERER = new MarkerClusterer(WORLD_MAP, [], mcoptions);
}

function buildMap() {
  var mapoptions = {
    center: new google.maps.LatLng(34.033333, -6.85),
    zoom: 2,
    maxZoom: MAX_ZOOM,
    minZoom: 1,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    gestureHandling: 'greedy',
    streetViewControl: false,
    mapTypeControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    backgroundColor: '#0a254e',
    styles: [
      {
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161'
          }
        ]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#f5f5f5'
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#c4c4c4'
          },
          {
            visibility: 'on'
          }
        ]
      },
      {
        featureType: 'administrative.land_parcel',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'administrative.neighborhood',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'poi',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e'
          }
        ]
      },
      {
        featureType: 'road',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'transit',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels.text',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      }
    ]
  };

  WORLD_MAP = new google.maps.Map(
    document.getElementById('google-map'),
    mapoptions
  );
  loadMap('map');
}

function clearMap() {
  OMS.removeAllMarkers();
  MARKER_CLUSTERER.clearMarkers();
}

function addList() {
  $('#programList').html("<div id='map-program-list'></div>");
  $('#map-program-list').append(
    "<div style='max-height: 100px; overflow: auto; font-size: 1.1em; text-align: center;'>" +
      SEARCH_RESULTS.verbiage +
      '</div>'
  );
  $('#map-program-list').append(
    "<div style='font-size: 0.9em; text-align: center; margin-top: 5px;'>" +
      $('#map-message').html() +
      ' Found</div>'
  );
  var currentId = 0;
  for (var i in SEARCH_RESULTS.data) {
    var program = SEARCH_RESULTS.data[i];
    var link =
      'https://liberty-sa.terradotta.com/index.cfm?FuseAction=Programs.ViewProgram&Program_ID=' +
      program.id;
    var mapMarkerButton =
      "<i class='fa fa-search-plus' aria-hidden='true' style='cursor: pointer;' onclick='goToMarker(" +
      currentId +
      ")' title='View Marker'>&nbsp;</i>";
    $('#map-program-list').append(
      "<hr /><div style='text-align: left;'>" +
        mapMarkerButton +
        "<b><a style='text-decoration: none' href='" +
        link +
        "'>" +
        program.value +
        '</a></b></div>'
    );
    for (var j in program.locations) {
      currentId++;
    }
  }
}

function goToMarker(id) {
  WORLD_MAP.setZoom(MAX_ZOOM);
  WORLD_MAP.setCenter(OMS.getMarkers()[id].getPosition());
  OMS.getMarkers()[id].set('spiderfied', true);
  setTimeout(function () {
    google.maps.event.trigger(OMS.getMarkers()[id], 'click');
  }, 150);
  changeDisplay();
}

function addMarkers() {
  var infowindow = new google.maps.InfoWindow();
  for (var i in SEARCH_RESULTS.data) {
    for (var j in SEARCH_RESULTS.data[i].locations) {
      var location = SEARCH_RESULTS.data[i].locations[j];

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(location.latitude, location.longitude)
      });

      marker.set('popup', addProgramHtml(SEARCH_RESULTS.data[i], location));
      marker.set('program_index', i);
      marker.set('location_index', j);
      marker.set('unique', location.unique);
      marker.set('title', SEARCH_RESULTS.data[i].value);

      if (!location.unique) {
        marker.setLabel('+');
        marker.set('spiderfied', false);
        marker.set('popup', '');
      }

      google.maps.event.addListener(marker, 'mouseover', function (e) {
        if (this.get('popup') !== '') {
          infowindow.setContent(this.get('popup'));
          infowindow.open(WORLD_MAP, this);
        }
      });

      google.maps.event.addListener(marker, 'click', function (e) {
        editMarkerVisibility(this, false);
        if (this.get('popup') !== '') {
          infowindow.setContent(this.get('popup'));
          infowindow.open(WORLD_MAP, this);
        }
      });

      OMS.addMarker(marker);
      MARKER_CLUSTERER.addMarker(marker);
    }
  }

  if (SEARCH_RESULTS.total) MARKER_CLUSTERER.fitMapToMarkers();

  google.maps.event.addListener(WORLD_MAP, 'click', function (event) {
    infowindow.close();
    for (var i in OMS.getMarkers()) {
      editMarkerVisibility(OMS.getMarkers()[i], true);
    }
    OMS.unspiderfy();
  });
}

function editMarkerVisibility(marker, hide) {
  if (OMS.markersNearMarker(marker, true).length) {
    var cluster = OMS.markersNearMarker(marker);
    cluster.push(marker);
    for (i in cluster) {
      if (cluster[i].get('spiderfied') && hide) {
        cluster[i].setLabel('+');
        cluster[i].set('spiderfied', false);
        cluster[i].set('popup', '');
      } else if (!hide) {
        cluster[i].setLabel('');
        cluster[i].set('spiderfied', true);
        cluster[i].set(
          'popup',
          addProgramHtml(
            SEARCH_RESULTS.data[cluster[i].get('program_index')],
            SEARCH_RESULTS.data[cluster[i].get('program_index')].locations[
              cluster[i].get('location_index')
            ]
          )
        );
      }
    }
  }
}

function showSearch() {
  for (var group in SEARCH_CRITERIA) {
    var option = document.createElement('option');
    option.value = group;
    option.text = SEARCH_CRITERIA[group].name;
    document.getElementById('map-select1').add(option);
  }

  setSearchCriteria();

  $('.hide').removeClass('hide');
  $('#map-loading').addClass('hide');

  $('#map-search1').selectize({
    maxItems: 10,
    valueField: 'value',
    labelField: 'label',
    searchField: 'label',
    placeholder: 'Search For Any Trips',
    selectOnTab: true,
    options: CURRENT_SEARCH_CRITERIA,
    optgroups: CURRENT_SEARCH_CRITERIA.map(function (i) {
      return {
        value: i.optgroup,
        label: i.optgroup
      };
    }).filter(filterUnique),
    plugins: ['remove_button'],
    onFocus: function () {
      $('#searchSubmit').addClass('focus');
      $('#map-select1').addClass('focus');
      $('.preMadeSubmit').addClass('focus');
    },
    onBlur: function () {
      $('#searchSubmit').removeClass('focus');
      $('#map-select1').removeClass('focus');
      $('.preMadeSubmit').removeClass('focus');
    }
  });
}

function _cb_getParameters(data) {
  //populate SEARCH_CRITERIA with parameters
  if (data.RECORDCOUNT === 1) data.ELEMENT = [data.ELEMENT];
  for (param in data.ELEMENT) {
    manipulateSearchParameters(
      data.ELEMENT[param].DISPLAY_NAME,
      data.ELEMENT[param].OPTIONS.OPTION,
      'VALUE',
      'NAME',
      data.ELEMENT[param].FORM_NAME
    );
    SEARCH_CRITERIA[data.ELEMENT[param].DISPLAY_NAME].type =
      data.ELEMENT[param].PARAM_TYPE;
    SEARCH_CRITERIA[data.ELEMENT[param].DISPLAY_NAME].data =
      SEARCH_CRITERIA[data.ELEMENT[param].DISPLAY_NAME].data.slice(1);
  }
  loadSearch('parameters');
}

function manipulateSearchResults(data, total, verbiage) {
  if (data[1] === undefined) {
    SEARCH_RESULTS = {
      link: SEARCH_RESULTS.link,
      total: total,
      verbiage: verbiage,
      data: []
    };
  } else {
    var tempVals = [];
    var duplicateLocations = Object.values(data)
      .map(function (i) {
        return i.PROGRAM_CITY;
      })
      .filter(function (val, i, arr) {
        //filters out any non-unique values from array
        return arr.indexOf(val) !== i;
      })
      .filter(function (val, i, arr) {
        return arr.indexOf(val) === i;
      });

    SEARCH_RESULTS = {
      link: SEARCH_RESULTS.link,
      total: total,
      verbiage: verbiage,
      data: Object.values(data)
        .map(function (i, index) {
          return {
            value: i.PROGRAM_NAME.replace('LU Send - ', '').replace(
              'LU Send Domestic - ',
              ''
            ),
            id: i.PROGRAM_ID,
            locations: [
              {
                region: i.PROGRAM_REGION,
                country: i.PROGRAM_COUNTRY,
                city: i.PROGRAM_CITY,
                latitude: i.PROGRAM_LATITUDE,
                longitude: i.PROGRAM_LONGITUDE,
                unique: !duplicateLocations.includes(i.PROGRAM_CITY)
              }
            ]
          };
        })
        .filter(function (val, i, arr) {
          //filters out any non-unique values from array
          var newArr = arr.map(function (j) {
            return j.id;
          });
          if (newArr.indexOf(val.id) !== i) {
            tempVals.push([val.id, val.locations[0]]);
          }
          return newArr.indexOf(val.id) === i;
        })
    };
  }

  for (var i in tempVals) {
    for (var j in SEARCH_RESULTS.data) {
      if (tempVals[i][0] === SEARCH_RESULTS.data[j].id) {
        SEARCH_RESULTS.data[j].locations.push(tempVals[i][1]);
      }
    }
  }
}

function addProgramHtml(program, location) {
  var headerhtml =
    "<div style='overflow:hidden;' class='text-center'><strong>" +
    program.value +
    '</strong></div>';

  var bodyhtml = '<ul class="mb-2">';
  for (var i in program.locations) {
    if (
      location.city === program.locations[i].city &&
      program.locations.length > 1
    )
      bodyhtml += '<li><b>';
    else bodyhtml += '<li>';
    bodyhtml +=
      program.locations[i].city +
      ', ' +
      program.locations[i].country +
      ', ' +
      program.locations[i].region;
    if (
      location.city === program.locations[i].city &&
      program.locations.length > 1
    )
      bodyhtml += '</b></li>';
    else bodyhtml += '</li>';
  }
  bodyhtml += '</ul>';

  var footerhtml =
    "<div class='text-center'><a class='btn btn-primary btn-xs' href='https://liberty-sa.terradotta.com/index.cfm?FuseAction=Programs.ViewProgram&Program_ID=" +
    program.id +
    "'>Learn More</a></div>";

  return (
    "<div style='border-right: 1px solid #000; padding-right: 15px;'>" +
    headerhtml +
    bodyhtml +
    footerhtml +
    '</div>'
  );
}

function manipulateSearchParameters(
  group,
  data,
  key,
  value,
  id,
  optionalValues
) {
  if (data[1] === undefined) {
    SEARCH_CRITERIA[group] = {
      name: group.toString(),
      id: id.toString(),
      data: []
    };
  } else {
    SEARCH_CRITERIA[group] = {
      name: group.toString(),
      id: id.toString(),
      data: Object.values(data)
        .map(function (i) {
          var optionals = {};
          for (var j in optionalValues)
            optionals[j.toString()] =
              i[optionalValues[j.toString()].toString()].toString();
          return Object.assign(
            {
              value: i[key].toString(),
              label: i[value].toString(),
              optgroup: group.toString()
            },
            optionals
          );
        })
        .filter(filterUnique)
    };
  }
}

function getUrlVariables(varName) {
  var searchString = window.location.search.substring(1),
    i,
    val,
    vars = searchString.split('&');

  for (i = 0; i < vars.length; i++) {
    val = vars[i].split('=');
    if (val[0] == varName) {
      return val[1];
    }
  }
  return null;
}

function _cb_getPrograms(data) {
  //populate SEARCH_CRITERIA with programs
  var total = data.ROWCOUNT;
  if (total > 1) data = data.PROGRAM;
  else
    data = {
      1: data.PROGRAM
    };

  //manipulateSearchParameters("Programs", data, "PROGRAM_NAME", "PROGRAM_NAME", "programName", false);
  manipulateSearchParameters(
    'Regions',
    data,
    'PROGRAM_REGION',
    'PROGRAM_REGION',
    'region'
  );
  manipulateSearchParameters(
    'Countries',
    data,
    'PROGRAM_COUNTRY',
    'PROGRAM_COUNTRY',
    'country'
  );
  manipulateSearchParameters(
    'Cities',
    data,
    'PROGRAM_CITY',
    'PROGRAM_CITY',
    'city',
    {
      long: 'PROGRAM_LONGITUDE',
      lat: 'PROGRAM_LATITUDE'
    }
  );

  loadSearch('programs');
}

$(document).ready(function () {
  $([document.documentElement, document.body]).scrollTop(
    $('#mapsearchwrapper').offset().top
  );
  var parameterIdString = PARAMETER_IDS.map(function (i) {
    //turns the parameter ids into strings
    return i;
  }).toString();

  LINK_VARIABLES =
    '?FuseAction=' +
    getUrlVariables('FuseAction') +
    '&Link_ID=' +
    getUrlVariables('Link_ID');

  var link;
  if ((link = getUrlVariables('preload'))) {
    PRE_SEARCH = decodeURIComponent(link);
  }

  if ($('#pagenav a:contains(Logout)').length == 1) {
    $('#home_applied span').text('Navigation Links');
    $('#home_applied a:nth-child(2)').text('MY APPLICATIONS');
    $('#home_applied a:nth-child(2)').attr(
      'href',
      '/index.cfm?FuseAction=Students.Home&RequiredProfile=1'
    );

    if ($('#pagenav a:contains(Administrative)').length == 1) {
      $('#home_applied a:nth-child(3)').text('ADMINISTRATIVE');
      $('#home_applied a:nth-child(3)').attr(
        'href',
        '/index.cfm?FuseAction=Administration.Home&RequiredProfile=1'
      );
    } else {
      $('#home_applied a:nth-child(3)').css('display', 'none');
    }

    var newlink = document.createElement('a');
    newlink.setAttribute('href', '/index.cfm?FuseAction=Security.Logout');
    newlink.innerHTML = 'LOGOUT';
    $('#home_applied').append(newlink);
  }

  createIESupport();
  loadScripts();

  document.addEventListener('click', function (event) {
    if ($('#map-minimize').is(':visible')) {
      var path =
        event.path ||
        (event.composedPath && event.composedPath()) ||
        composedPath(event.target);
      if (!isOnId(path, 'programList') && !isOnId(path, 'map-minimize'))
        changeDisplay(false);
    }
  });

  SEARCH_LOAD++; //load parameters
  if (PARAMETER_IDS.length > 0)
    $.getJSON(
      'https://liberty-sa.terradotta.com/piapi/index.cfm?callName=getProgramSearchElements&ResponseEncoding=JSON&callBackName=getParameters&jsoncallback=?&param_ids=' +
        parameterIdString +
        '&parameters=yes'
    );
  else loadSearch('parameters');

  SEARCH_LOAD++; //load programs
  $.getJSON(
    'https://liberty-sa.terradotta.com/piapi/index.cfm?callName=getProgramSearchResults&ResponseEncoding=JSON&callBackName=getPrograms&jsoncallback=?&params=p_11009=' +
      encodeSearchValue(MAP_TYPE) +
      '|p_11009_t=SELCT'
  );
});
