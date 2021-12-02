export {};

declare global {
  var google: any;
  var OverlappingMarkerSpiderfier: any;
  var markerClusterer: any;

  interface JQuery {
    selectize: any;
  }

  interface HTMLElement {
    selectize: any;
  }
}

class MapDriver {
  protected APIKey: string;
  protected MapID: string;
  protected initZoom: number = 3;
  protected maxZoom: number = 9;
  protected minZoom: number = 1;

  protected map: any;
  protected oms: any;
  protected cluster: any;
  protected markers: any = {};
  protected info: any;
  protected lastMarker: any;
  protected bounds: any;

  protected visible =
    'M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z';
  protected invisible =
    'M11.83 9L15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7z';
  protected expand =
    'M21.92 11.62a1 1 0 0 0-.21-.33l-2.5-2.5a1 1 0 0 0-1.42 1.42l.8.79H14a1 1 0 0 0 0 2h4.59l-.8.79a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l2.5-2.5a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76zM10 11H5.41l.8-.79a1 1 0 0 0-1.42-1.42l-2.5 2.5a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33l2.5 2.5a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42l-.8-.79H10a1 1 0 0 0 0-2z';
  protected shrink =
    'M10.71 11.29l-2.5-2.5a1 1 0 1 0-1.42 1.42l.8.79H3a1 1 0 0 0 0 2h4.59l-.8.79a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l2.5-2.5a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33zM21 11h-4.59l.8-.79a1 1 0 0 0-1.42-1.42l-2.5 2.5a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33l2.5 2.5a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42l-.8-.79H21a1 1 0 0 0 0-2z';

  protected possibleColors = ['#0a254e'];

  protected icons = {
    open: (color: string = '#cf3e3e') =>
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' width='32' height='32' preserveAspectRatio='xMidYMid meet' viewBox='5 2 14 20'><path d='M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7m4.5 7H14v5h-4V9H7.5L12 4.5z' fill='${color}'></path></svg>`
      ),
    multi: (color: string = '#cf3e3e') =>
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' width='32' height='32' preserveAspectRatio='xMidYMid meet' viewBox='3 2 18 20'><path d='M14 11.5A2.5 2.5 0 0 0 16.5 9A2.5 2.5 0 0 0 14 6.5A2.5 2.5 0 0 0 11.5 9a2.5 2.5 0 0 0 2.5 2.5M14 2c3.86 0 7 3.13 7 7c0 5.25-7 13-7 13S7 14.25 7 9a7 7 0 0 1 7-7M5 9c0 4.5 5.08 10.66 6 11.81L10 22S3 14.25 3 9c0-3.17 2.11-5.85 5-6.71C6.16 3.94 5 6.33 5 9z' fill='${color}'></path></svg>`
      ),
    single: (color: string = '#cf3e3e') =>
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' width='32' height='32' preserveAspectRatio='xMidYMid meet' viewBox='5 2 14 20'><path d='M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z' fill='${color}'></path></svg>`
      )
  };

  constructor(
    APIKey: string,
    {
      MapID = 'map',
      maxZoom = 9,
      minZoom = 1,
      initZoom = 3,
      possibleColors = [
        '#001219',
        '#005f73',
        '#0a9396',
        '#94d2bd',
        '#e9d8a6',
        '#ee9b00',
        '#ca6702',
        '#bb3e03',
        '#ae2012',
        '#9b2226'
      ]
    } = {}
  ) {
    this.APIKey = APIKey;
    this.MapID = MapID;
    this.maxZoom = maxZoom;
    this.minZoom = minZoom;
    this.initZoom = initZoom;
    this.possibleColors = possibleColors;
  }

  protected async getScripts() {
    await this.getScript(
      'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.13.3/js/standalone/selectize.min.js'
    );

    await this.getCSS(
      'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.13.3/css/selectize.bootstrap4.min.css'
    );

    await this.getScript(
      'https://cdnjs.cloudflare.com/ajax/libs/OverlappingMarkerSpiderfier/1.0.3/oms.min.js'
    );

    await this.getScript(
      'https://cdnjs.cloudflare.com/ajax/libs/OverlappingMarkerSpiderfier/1.0.3/oms.js'
    );

    await this.getScript(
      'https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js'
    );

    await this.getScript(
      'https://unpkg.com/@googlemaps/js-api-loader@1.0.0/dist/index.min.js'
    );

    const loader = new google.maps.plugins.loader.Loader({
      apiKey: this.APIKey,
      version: 'weekly'
    });

    await loader.load();
  }

  protected addEventListeners() {
    google.maps.event.addListener(this.map, 'idle', () => {
      Object.getPrototypeOf(this.oms).formatMarkers.call(this.oms);
    });

    google.maps.event.addListener(this.map, 'click', () => {
      if (this.lastMarker)
        this.lastMarker.setIcon({
          url: this.icons.single(this.lastMarker.get('color'))
        });

      this.lastMarker = null;
      this.info.close();
    });
  }

  public async init() {
    await this.getScripts();

    this.map = new google.maps.Map(document.getElementById(this.MapID), {
      center: { lat: 34.033, lng: -6.85 },
      zoom: this.initZoom,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      mapTypeID: google.maps.MapTypeId.HYBRID,
      streetViewControl: false,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
        style: google.maps.MapTypeControlStyle.DEFAULT
      },
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      backgroundColor: '#0a254e'
    });

    this.oms = new OverlappingMarkerSpiderfier(this.map, {
      markersWontMove: true,
      markersWontHide: true,
      keepSpiderfied: true
    });

    this.cluster = new markerClusterer.MarkerClusterer({
      map: this.map,
      algorithm: new markerClusterer.SuperClusterAlgorithm({
        maxZoom: this.maxZoom - 1
      })
    });

    this.resetMarkers();

    await this.addControlToggle();

    this.addEventListeners();
  }

  public toggleMarkerList(force: boolean) {
    if (force === true) {
      $('#map-markers-list-icon path').attr('d', this.expand);
    }

    if (force === false) {
      $('#map-markers-list-icon path').attr('d', this.shrink);
    }

    if ($('#map-markers-list-icon path').attr('d') === this.shrink) {
      $('#map-markers-list-icon path').attr('d', this.expand);
      $('#map-markers-list').css('max-width', '0px');
      $('#map-markers-list').css('padding', '0px');
    } else {
      $('#map-markers-list-icon path').attr('d', this.shrink);
      $('#map-markers-list').css('max-width', '50%');
      $('#map-markers-list').css('padding', '0.65rem');
    }
  }

  public async updateMarkerList(headerElement: JQuery<HTMLElement> | string) {
    if (!$('#map-markers-list').length) await this.addMarkerList();

    $('#map-markers-list .list-content').html('');
    $('#map-markers-list .list-content').append(headerElement);
    $('#map-markers-list .list-content').append(
      `<div style='text-align: center;'><strong>${
        Object.keys(this.markers).length
      }</strong> Found</div>`
    );

    Object.keys(this.markers).forEach((id) => {
      const marker = this.markers[id];

      $('#map-markers-list .list-content').append(
        '<hr>',
        $(`<div class='list-markers'>`).append(
          $('<a>')
            .append(
              `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' width='24' height='24' preserveAspectRatio='xMidYMid meet' viewBox='2 2 20 20'><path d='M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 10.5a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 9.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m0-5.3c-2.1 0-3.8 1.7-3.8 3.8c0 3 3.8 6.5 3.8 6.5s3.8-3.5 3.8-6.5c0-2.1-1.7-3.8-3.8-3.8z' fill='currentColor'></path></svg>`
            )
            .on('click', () => {
              this.showMarker(id);
              this.toggleMarkerList(false);
            }),
          $(`<a href='${marker.get('link') || '#'}'>`).append(
            `<strong>${marker.get('name')}</strong>`
          )
        )
      );
    });
  }

  public async addLoadingControl(position: string, id: string) {
    await this.addControl(
      position,
      $(
        `<div id='${id}' style='margin: 10px'><svg class='animate-spin' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' width='32' height='32' preserveAspectRatio='xMidYMid meet' viewBox='0 0 24 24'><path d='M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z' fill='currentColor'></path></svg></div>`
      )[0],
      id
    );
  }

  public removeLoadingControl(id: string) {
    $(`#${id}`).remove();
  }

  public async addMarkerList() {
    $('#map-markers-list').remove();

    await this.addControl(
      'LEFT_CENTER',
      $(`<div id='map-markers-list'></div>`)[0],
      'map-markers-list'
    );

    $('#map-markers-list').append(`<div class='list-content'></div>`);
    $('#map-markers-list').append(`<div class='list-toggle'></div>`);
    $('#map-markers-list .list-toggle').append(
      `<svg id='map-markers-list-icon' style='padding: 10px 0px' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' width='32' height='32' preserveAspectRatio='xMidYMid meet' viewBox='0 0 24 24'><path d='${this.shrink}' fill='#0a254e'></path></svg>`
    );

    google.maps.event.addDomListener(
      $('#map-markers-list .list-toggle')[0],
      'click',
      this.toggleMarkerList.bind(this)
    );
  }

  public toggleControls(force: boolean) {
    if (force === true) {
      $('#control-toggle path').attr('d', this.visible);
    }

    if (force === false) {
      $('#control-toggle path').attr('d', this.invisible);
    }

    if ($('#control-toggle path').attr('d') === this.visible) {
      $('#control-toggle path').attr('d', this.invisible);
      $('#map .gm-style > iframe ~ div:not(#control-toggle-parent)').hide(300);
    } else {
      $('#control-toggle path').attr('d', this.visible);
      $('#map .gm-style > iframe ~ div:not(#control-toggle-parent)').show(300);
    }
  }

  protected async addControlToggle() {
    await this.addControl(
      'RIGHT_TOP',
      $(
        `<svg id='control-toggle' style='right: 0px; margin: 15px 10px; z-index: 2;' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' width='32' height='32' preserveAspectRatio='xMidYMid meet' viewBox='0 0 24 24'><path d='${this.visible}' fill='#0a254e'></path></svg>`
      )[0],
      'control-toggle'
    );

    $('#control-toggle').parent().attr('id', 'control-toggle-parent');

    google.maps.event.addDomListener(
      $('#control-toggle')[0],
      'click',
      this.toggleControls.bind(this)
    );
  }

  public addMarker(
    position: { lat: number; lng: number },
    id: string,
    name: string,
    element: string,
    link: string = ''
  ) {
    const color =
      this.possibleColors[
        Object.keys(this.markers).length % this.possibleColors.length
      ];

    const marker = new google.maps.Marker({
      position,
      animation: google.maps.Animation.DROP
    });

    marker.set('color', color);
    marker.set('name', name);
    marker.set('id', id);
    marker.set('link', link);

    google.maps.event.addListener(marker, 'spider_click', () => {
      if (this.lastMarker !== marker) {
        this.info.setContent(
          `<div id='info-${id}'>${$(element)[0].outerHTML}</div>`
        );
        this.info.open(this.map, marker);

        marker.setIcon({ url: this.icons.open(marker.get('color')) });

        if (this.lastMarker)
          this.lastMarker.setIcon({
            url: this.icons.single(this.lastMarker.get('color'))
          });

        this.lastMarker = marker;
      } else {
        this.info.close();
        marker.setIcon({ url: this.icons.single(marker.get('color')) });
        this.lastMarker = null;
      }
    });

    google.maps.event.addListener(marker, 'spider_format', (status: any) => {
      const icon =
        status === OverlappingMarkerSpiderfier.markerStatus.SPIDERFIED
          ? this.icons.single
          : status === OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE
          ? this.icons.multi
          : status === OverlappingMarkerSpiderfier.markerStatus.UNSPIDERFIABLE
          ? this.icons.single
          : this.icons.single;
      marker.setIcon({ url: icon(marker.get('color')) });
    });

    this.oms.addMarker(marker);
    this.cluster.addMarker(marker);
    this.bounds.extend(marker.position);

    this.markers[id] = marker;

    return this;
  }

  public centerMap() {
    this.map.fitBounds(this.bounds, {
      top: 100,
      left: 100,
      bottom: 100
    });
  }

  public resetMarkers() {
    this.oms.removeAllMarkers();
    this.cluster.clearMarkers();
    this.markers = {};
    this.bounds = new google.maps.LatLngBounds();
    this.info = new google.maps.InfoWindow({
      content: '',
      disableAutoPan: true
    });
  }

  public showMarker(id: string) {
    const marker = this.markers[id];
    this.map.setZoom(this.maxZoom);
    this.map.panTo(marker.position);

    setTimeout(() => {
      google.maps.event.trigger(marker, 'click');
      google.maps.event.trigger(marker, 'spider_click');
    }, 150);
  }

  protected addControl(position: string, element: any, id: string) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (!$(`#${id}`).length) return;
        clearInterval(interval);
        resolve(element);
      }, 100);

      this.map.controls[google.maps.ControlPosition[position]].push(element);
    });
  }

  protected cleanseOptions(opts: any[]) {
    const options = opts.reduce((res, opt) => {
      return res.concat(
        opt.values.map((val: any) => {
          var res: Record<string, any> = {};
          if (!val?.hasOwnProperty('value')) val = { value: val, name: val };
          res.value = opt.id + '%2C' + val.value;
          res.name = val.name;
          res.group = opt.id;
          return res;
        })
      );
    }, []);
    return [options, opts];
  }

  public async addSelectize(
    position: string,
    opts: any[] = [],
    placeholder: string = 'Search...',
    id: string = 'search',
    submitCallback: (values: any) => any
  ) {
    await this.addControl(
      position,
      $(
        `<div class='selectizer' style='z-index: 1'><input type='text' id='${id}'></input><button id='${id}-submit' class='btn btn-primary'>Submit</button></div>`
      )[0],
      id
    );

    const [options, optgroups] = this.cleanseOptions(opts);

    $(`#${id}`).selectize({
      valueField: 'value',
      labelField: 'name',
      searchField: 'name',
      optgroupValueField: 'id',
      optgroupLabelField: 'name',
      optgroupField: 'group',
      lockOptgroupOrder: true,
      selectOnTab: true,
      plugins: ['remove_button', 'restore_on_backspace'],
      delimiter: '%7F',
      options,
      optgroups,
      placeholder
    });

    google.maps.event.addDomListener($(`#${id}-submit`)[0], 'click', () => {
      submitCallback(
        ($(`#${id}`).val() as string).split('%7F').map((v) => {
          const [id, value] = v.split('%2C');
          return { id, value };
        })
      );
    });
  }

  /**
   * ==================================
   * HELPER FUNCTIONS
   * ==================================
   */

  protected getScriptCached(url: string) {
    return $.ajax({ url: url, dataType: 'script', cache: true });
  }

  protected getScript(url: string) {
    return new Promise((resolve, reject) => {
      this.getScriptCached(url)
        .done(function (script) {
          resolve(script);
        })
        .fail(function (script) {
          reject(script);
        });
    });
  }

  protected async getCSS(url: string) {
    $('head').append(`<link rel=\'stylesheet\' href=\'${url}\' />`);
  }
}

(async function () {
  const mapDriver = new MapDriver('AIzaSyBcNbHG1bp2W6CQ1j6Ylp-hfv1E7qE6hZk');
  await mapDriver.init();

  mapDriver.addMarker(
    { lat: 31.56391, lng: 147.154312 },
    '0',
    'My Name 0',
    '<h1>This is element 3</h1>',
    'https://pcbowers.com'
  );
  mapDriver.addMarker(
    { lat: -31.56391, lng: 147.154312 },
    '1',
    'My Name 1 ',
    '<h1>This is element 3</h1>'
  );
  mapDriver.addMarker(
    { lat: -31.56391, lng: 147.154312 },
    '2',
    'My Name 3 ',
    '<h1>This is element 3</h1>'
  );
  mapDriver.addMarker(
    { lat: -31.56391, lng: 147.154312 },
    '2',
    'My Name 2',
    '<h1>This is element 3</h1>'
  );
  mapDriver.addMarker(
    { lat: -31.56391, lng: 147.154312 },
    '12',
    'My Name 2',
    '<h1>This is element 3</h1>'
  );
  mapDriver.addMarker(
    { lat: -31.56391, lng: 147.154312 },
    '22',
    'My Name 2',
    '<h1>This is element 3</h1>'
  );
  mapDriver.addMarker(
    { lat: -31.56391, lng: 147.154312 },
    '222',
    'My Name 2',
    '<h1>This is element 3</h1>'
  );
  mapDriver.addMarker(
    { lat: -31.56391, lng: 147.154312 },
    '32',
    'My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2My Name 2',
    '<h1>This is element 3</h1>'
  );
  mapDriver.addMarker(
    { lat: -31.56391, lng: 147.154312 },
    '42',
    'My Name 2',
    '<h1>This is element 3</h1>'
  );
  mapDriver.addMarker(
    { lat: -31.56391, lng: 147.154312 },
    '52',
    'My Name 2',
    '<h1>This is element 3</h1>'
  );
  mapDriver.addMarker(
    { lat: -31.56391, lng: 147.154312 },
    '62',
    'My Name 2',
    '<h1>This is element 3</h1>'
  );
  mapDriver.addMarker(
    { lat: -31.56391, lng: 147.154312 },
    '72',
    'My Name 2',
    '<h1>This is element 3</h1>'
  );
  mapDriver.addMarker(
    { lat: -31.56391, lng: 147.154312 },
    '82',
    'My Name 2',
    '<h1>This is element 3</h1>'
  );
  mapDriver.addMarker(
    { lat: -31.56391, lng: 147.154312 },
    '92',
    'My Name 2',
    '<h1>This is element 3</h1>'
  );
  mapDriver.addMarker(
    { lat: -31.56391, lng: 147.154312 },
    '992',
    'My Name 2',
    '<h1>This is element 3</h1>'
  );

  await mapDriver.addSelectize(
    'TOP_LEFT',
    [],
    'Search Programs',
    'lusend-search',
    (values) => console.log(values)
  );

  mapDriver.centerMap();
  mapDriver.showMarker('2');

  mapDriver.updateMarkerList($('<h6>Hello</h6>'));

  mapDriver.toggleControls(false), mapDriver.toggleControls(false);
})();
