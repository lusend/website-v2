/* Create the map driver */
var mapDriver = new MapDriver('AIzaSyBcNbHG1bp2W6CQ1j6Ylp-hfv1E7qE6hZk');

/* Create a new TD API driver */
var tdDriver = new TDDriver();

(function () {
  __async(this, null, function* () {
    /* Iniitialize all map driver scripts and listeners */
    try {
      yield mapDriver.init();
    } catch (e) {
      console.error(e);
    }

    /* Create a loading sign while the search elements are generated */
    try {
      yield mapDriver.addLoadingControl('TOP_CENTER', 'lusend-temporary');
    } catch (e) {
      console.error(e);
    }

    /* Register new search elements to allow public searches from map */
    /* Registration order matters. This dictates the order they appear in the search */
    tdDriver.registerSearchElement('City').makePublic();
    tdDriver.registerSearchElement('Country').makePublic();
    tdDriver.registerSearchElement('Region').makePublic();
    tdDriver.registerSearchElement('11010').makePublic(); // Courses
    tdDriver.registerSearchElement('11034').makePublic(); // Schools
    tdDriver.registerSearchElement('11035').makePublic(); // Departments
    tdDriver.registerSearchElement('11029').makePublic(); // Terms
    tdDriver.registerSearchElement('ProgramName').makePublic();

    /* Register new search elements to allow private searches from code */
    tdDriver.registerSearchElement('ProgramType').makePrivate();
    tdDriver.registerSearchElement('Term').makePrivate(); // Official Terms
    tdDriver.registerSearchElement('11009').makePrivate(); // LU Send Map

    /* Solidifies registered search elements */
    try {
      yield tdDriver.confirmSearchElements();
    } catch (e) {
      console.error(e);
    }

    /* Add permanent searches here */
    /* Only include faculty led programs */
    tdDriver.searchIn('11009').for('Faculty-Led Programs').makePermanent();

    /* Optional, but does constrain location information and populates program name */
    /* After permanent searches so that program names that are inaccessible are not listed */
    try {
      yield tdDriver.refineSearchElements();
    } catch (e) {
      console.error(e);
    }

    /* Add custom searches here */
    /* All Programs. Returns nothing, since not filters aree needed */
    tdDriver.registerCustomSearch('allPrograms', 'All Trips', () => {
      return;
    });

    /* Domestic programs. Filters for programs in the US */
    tdDriver.registerCustomSearch('domesticPrograms', 'Domestic Trips', () => {
      tdDriver.searchIn('Country').for('United States').makeTemporary();
      return;
    });

    /* Now that the search elements are generated, remove the loading sign */
    mapDriver.removeLoadingControl('lusend-temporary');

    /* Create the search bar */
    try {
      yield mapDriver.addSelectize(
        'TOP_LEFT',
        tdDriver.searchElements,
        'Search Programs',
        'lusend-search',
        afterSubmit
      );
    } catch (e) {
      console.error(e);
    }
  });
})();

function afterSubmit(values) {
  __async(this, null, function* () {
    /* Register searches */
    values.forEach((val) => {
      if (val.id && val.value)
        tdDriver.searchIn(val.id).for(val.value).makeTemporary();
    });

    /* Get search results */
    try {
      yield tdDriver.confirmSearchResults();
    } catch (e) {
      console.error(e);
    }

    console.log(tdDriver.curSearchResultsURL);

    tdDriver.searchResults.forEach((trip) => {
      trip.locations.forEach((position) => {
        mapDriver.addMarker(
          { lat: position.latitude, lng: position.longitude },
          trip.id,
          trip.name,
          `<div>${trip.name}</div>`,
          `https://liberty-sa.terradotta.com/index.cfm?FuseAction=Programs.ViewProgram&Program_ID=${id}`
        );
      });
    });

    mapDriver.centerMap();

    try {
      yield mapDriver.updateMarkerList(
        `<div class='text-lg text-center mb-2'>${tdDriver.curSearchResultsVerbiage}</div>`
      );
    } catch (e) {
      console.error(e);
    }

    mapDriver.toggleMarkerList(true);
  });
}
