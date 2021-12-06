class TDDriver {
  /**
   * ==================================================
   * BASE CONSTANTS
   * ==================================================
   */

  /** Custom ID */
  protected customID = 'custom';

  /** Custom Name */
  protected customName = 'Common Searches';

  /** The base URL for the website. */
  protected baseURL = 'https://liberty-sa.terradotta.com/';

  /** The base URL to connect to the API. */
  protected baseAPIURL = 'https://liberty-sa.terradotta.com/piapi/index.cfm?';
  // test
  /** A list of the base element names and whether or not they support a terminator between values. */
  protected basePossibleElements: {
    elementURL: string;
    elementID: string;
    searchURL: string;
    searchID?: string;
    terminator: boolean;
  }[] = [
    {
      elementURL: 'program_name',
      elementID: 'program_name',
      searchURL: 'ProgramName',
      searchID: 'PROGRAM_NAME',
      terminator: false
    },
    {
      elementURL: 'city',
      elementID: 'pi',
      searchURL: 'City',
      searchID: 'PROGRAM_CITY',
      terminator: true
    },
    {
      elementURL: 'country',
      elementID: 'pc',
      searchURL: 'Country',
      searchID: 'PROGRAM_COUNTRY',
      terminator: true
    },
    {
      elementURL: 'region',
      elementID: 'pr',
      searchURL: 'Region',
      searchID: 'PROGRAM_REGION',
      terminator: true
    },
    {
      elementURL: 'terms',
      elementID: 'pt',
      searchURL: 'Term',
      terminator: true
    },
    {
      elementURL: 'program_type',
      elementID: 'program_type_id',
      searchURL: 'ProgramType',
      terminator: false
    }
  ];

  /**
   * ==================================================
   * Public Data
   * ==================================================
   */

  /** Contains currently registered elements. */
  public registeredElements: {
    id: string;
    private: boolean;
    name?: string;
  }[] = [];

  /** Contains currently registered search results. */
  public registeredResults: {
    id: string;
    value: string[];
    permanent: boolean;
  }[] = [];

  /** The search element URL. Generated after confirming the search elements. */
  public curSearchElementURL = '';

  /** The search results URL. Generated after confirming the search results. */
  public curSearchResultsURL = '';

  /** The search results verbiage. Generated after confirming the search results. */
  public curSearchResultsVerbiage = '';

  /** A list of the dynamic search data currently available. Additional data may be included based on parameter inclusion and/or refining. */
  public searchElements: {
    id: string;
    private: boolean;
    type?: string;
    name?: string;
    values?: {
      value: string;
      name: string;
      search?: () => any;
    }[];
  }[] = [];

  /** A list of the dynamic search results after completing a search. Additional results may be included based on program refining. */
  public searchResults: {
    id: string;
    name: string;
    locations: {
      region: string;
      country: string;
      city: string;
      longitude: number;
      latitude: number;
    }[];
    parameters?: {
      id: string;
      name: string;
      type: string;
      value: string[];
    }[];
    dates?: {
      deadline: string;
      decision: string;
      start: string;
      end: string;
      term: string;
      year: string;
    }[];
    brochureText?: string;
    applyLink?: string;
    infoLink?: string;
    modifiedDate?: string;
    createdDate?: string;
    active?: boolean;
    terms?: string[];
  }[] = [];

  /**
   * ==================================================
   * CONSTRUCTOR
   * ==================================================
   */

  constructor(
    customID: string = 'custom',
    customName: string = 'Common Searches'
  ) {
    this.customID = customID;
    this.customName = customName;
  }

  /**
   * ==================================================
   * HELPER FUNCTIONS
   * ==================================================
   */

  /**
   * Cleanses a string for inclusion in a URL.
   * @param value Any string value.
   * @returns An encoded URI component with quotes replaced properly.
   */
  protected cleanseString(value: string) {
    return encodeURIComponent(value).replace(/"/g, '%22').replace(/'/g, '%27');
  }

  /**
   * A wrapper for cleanseString that supports arrays and strings.
   * @param value any string or array of strings.
   * @returns Each element cleansed (array or string).
   */
  protected cleanseValue(value: string | string[]) {
    if (Array.isArray(value)) return value.map(this.cleanseString);
    return this.cleanseString(value);
  }

  /**
   * A function that splits an array based on the filter function passed.
   * @param array An array of any type.
   * @param filter A filter function that returns a boolean.
   * @returns an array containing two arrays like so: [pass, fail].
   */
  protected splitArray<T>(array: T[], filter: (val: T) => boolean) {
    return array.reduce(
      ([pass, fail]: T[][], elem: T) => {
        return filter(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
      },
      [[], []] as T[][]
    ) as T[][];
  }

  /**
   * An array duplicator helper function.
   * @param array An array to duplicate.
   * @returns An array that is an exact duplicate of the original array.
   */
  protected duplicateArray<T>(array: T[]) {
    return array.reduce(
      (res: T[], current: T) => res.concat([current, current]),
      []
    );
  }

  /**
   * Converts any value into an array, making it easier to operate with.
   * @param value Any variable or value, though typically from the API.
   * @returns An array of the values.
   */
  protected convertToArray(value: any | any[]) {
    if (Object.keys(value).length)
      return Object.values(value?.hasOwnProperty('1') ? value : { '1': value });
    if (Array.isArray(value)) return value;
    return [value];
  }

  /**
   * A filter function used to extract unique/distinct values.
   * @param value The current value in the array.
   * @param index The current index number.
   * @param self The array itself.
   * @returns True or false based on whether or not it's unique
   */
  protected onlyUnique(value: any, index: number, self: any[]) {
    return self.indexOf(value) === index;
  }

  /**
   * ==================================================
   * BASE ELEMENT HELPER FUNCTIONS
   * ==================================================
   */

  /**
   * A function to check the current form of a given search element ID.
   * @param id The specified id to check its form. Refer to this.basePossibleElements for more information.
   * @returns The form if it matches or the original string if it does not.
   */
  protected currentIDForm(id: string) {
    return this.basePossibleElements.reduce((val: string, el) => {
      (Object.keys(el) as Array<keyof typeof el>).forEach((key) => {
        if (el[key] === id) val = key;
      });
      return val;
    }, '' as string);
  }

  /**
   * A function to convert an ID of a given search element ID.
   * @param id The specified id that needs to be converted.
   * @param phase The phase to convert to. Refer to this.basePossibleElements for more information.
   * @returns The phase-specific ID or the value passed if no matches were found.
   */
  protected convertID(
    id: string,
    phase: 'elementURL' | 'elementID' | 'searchURL' | 'searchID'
  ) {
    const phase1Index = this.basePossibleElements.findIndex(
      (val) => val.elementURL.toLowerCase() === id.toLowerCase()
    );
    const phase2Index = this.basePossibleElements.findIndex(
      (val) => val.elementID.toLowerCase() === id.toLowerCase()
    );
    const phase3Index = this.basePossibleElements.findIndex(
      (val) => val.searchURL.toLowerCase() === id.toLowerCase()
    );
    const phase4Index = this.basePossibleElements.findIndex(
      (val) => val.searchID?.toLowerCase() === id.toLowerCase()
    );

    if (phase1Index >= 0)
      return this.basePossibleElements[phase1Index][phase] || '';
    if (phase2Index >= 0)
      return this.basePossibleElements[phase2Index][phase] || '';
    if (phase3Index >= 0)
      return this.basePossibleElements[phase3Index][phase] || '';
    if (phase4Index >= 0)
      return this.basePossibleElements[phase4Index][phase] || '';

    if (phase === 'elementURL' && id.startsWith('p_') && !isNaN(+id.substr(2)))
      return id.substr(2);

    if (phase !== 'elementURL' && !id.startsWith('p_') && !isNaN(+id))
      return `p_${id}`;

    return id;
  }

  /**
   * ==================================================
   * URL HELPER FUNCTIONS
   * ==================================================
   */

  /**
   * Creates a fully cleansed parameter, including both the key and its value.
   * @param key The left side before the equals.
   * @param value The right side after the equals
   * @param options An object to define custom prefixes, suffixes, delimeters, and terminators.
   * @returns A fully cleansed parameter.
   */
  protected createParam(
    key: string,
    value: string | string[],
    {
      prefix = '',
      suffix = '',
      delimeter = '%2C',
      terminator = false
    }: {
      prefix?: string;
      suffix?: string;
      delimeter?: string;
      terminator?: boolean | string;
    } = {}
  ) {
    terminator =
      terminator === true ? '%7F' : terminator === false ? '' : terminator;
    value = this.cleanseValue(value);
    value = Array.isArray(value) ? value.join(terminator + delimeter) : value;
    return `${prefix}${key}=${value}${terminator}${suffix}`;
  }

  /**
   * Generates the initial URL depending on the type of API call.
   * @param type The type of initial URL.
   * @returns A string.
   */
  protected generateInitialURL(
    type:
      | 'getProgramSearchElements'
      | 'getProgramSearchResults'
      | 'getProgramBrochure'
  ) {
    return (
      this.baseAPIURL +
      [
        this.createParam('callName', type),
        this.createParam('ResponseEncoding', 'JSON'),
        this.createParam('callback', 'false')
      ].join('&')
    );
  }

  /**
   * Generates a URL based on the registered search elements.
   * @returns A string representing the generated URL based on the already-registered Search Elements.
   */
  protected generateElementURL() {
    const [base, params] = this.splitArray(
      this.registeredElements,
      (val) => !!this.currentIDForm(val.id)
    );

    return [
      this.generateInitialURL('getProgramSearchElements'),
      ...base.map((val) =>
        this.createParam(this.convertID(val.id, 'elementURL'), 'true')
      ),
      params.length && this.createParam('parameters', 'true'),
      params.length &&
        this.createParam(
          'param_ids',
          params.map((i) => i.id)
        )
    ]
      .filter((i) => !!i)
      .join('&');
  }

  /**
   * Generates a URL based on the desired program to get more data.
   * @param id A string representing the ID of the program.
   * @returns A string representing the API URL to return more information about the program.
   */
  protected generateProgramDataURL(id: string) {
    return [
      this.generateInitialURL('getProgramBrochure'),
      this.createParam('Program_ID', id),
      this.createParam('Options', 'locations,terms,parameters,dates')
    ]
      .filter((i) => !!i)
      .join('&');
  }

  /**
   * Generates the part of the URL that is necessary for Parameter Search.
   * @param params A list of TD parameters, each with their own id and value.
   * @returns A string representing the parameter for all selected TD Params.
   */
  protected generateResultsParams(params: typeof this.registeredResults) {
    const prefix = params.length ? this.createParam('Params', '') : '';
    return (
      prefix +
      this.duplicateArray(
        params.map((p) => {
          p.id = this.convertID(p.id, 'searchURL');
          return p;
        })
      )
        .map((param, index) => {
          if (index % 2 === 1)
            return this.createParam(
              `${param.id}_t`,
              this.searchElements.find((el) => el.id === param.id)?.type || ''
            );

          return this.createParam(param.id, param.value, { terminator: true });
        })
        .join('|')
    );
  }

  /**
   * Generates a URL to be used to query the API for program search results.
   * @returns A string representing the URL to get all search results from the API.
   */
  protected generateResultsURL(permanentOnly: boolean = false) {
    const [base, params] = this.splitArray(
      this.registeredResults.filter((res) =>
        permanentOnly ? !!res.permanent : true
      ),
      (val) => !!this.currentIDForm(val.id)
    );
    return [
      this.generateInitialURL('getProgramSearchResults'),
      ...base.map((val) => {
        return this.createParam(
          this.convertID(val.id, 'searchURL'),
          val.value,
          {
            terminator: !!this.basePossibleElements.find(
              (el) => el.searchURL === this.convertID(val.id, 'searchURL')
            )?.terminator
          }
        );
      }),
      this.generateResultsParams(params)
    ]
      .filter((i) => !!i)
      .join('&');
  }

  /**
   * ==================================================
   * WARNING/CHECK FUNCTIONS
   * ==================================================
   */

  /**
   * Checks validity of the search element.
   * @param id A string representing the ID (key) of the search element.
   * @returns A boolean based on validity.
   */
  public checkSearchElementValid(id: string) {
    let flag = true;
    if (isNaN(+id) && !this.currentIDForm(id)) {
      console.warn(`This search element '${id}' does not exist.`);
      flag = false;
    }

    return flag;
  }

  /**
   * Checks validity of the search value.
   * @param id A string representing the ID (key) of the search.
   * @returns A boolean based on validity.
   */
  public checkSearchValueValid(id: string) {
    let flag = true;
    if (!this.curSearchElementURL) {
      console.warn(
        `Make sure to register search elements and pull them first (triggered by '${id}').`
      );
      flag = false;
    }
    if (
      ((!id.startsWith('p_') && isNaN(+id)) ||
        (id.startsWith('p_') && isNaN(+id.substr(2)))) &&
      !this.currentIDForm(id) &&
      id !== this.customID
    ) {
      console.warn(`This search element '${id}' does not exist.`);
      flag = false;
    }
    if (
      !this.searchElements.some(
        (el) => el.id === this.convertID(id, 'searchURL')
      )
    ) {
      console.warn(`This search element '${id}' has not been registered.`);
      flag = false;
    }

    return flag;
  }

  /**
   * Checks validity of the program.
   * @param id A string representing the ID (key) of the search results.
   * @returns A boolean based on validity.
   */
  public checkProgramValid(id: string) {
    let flag = true;

    if (!this.searchResults.some((i) => i.id === id)) {
      console.warn(
        `This program id '${id}' does not exist in the current search results.`
      );
      flag = false;
    }

    return flag;
  }

  /**
   * Checks if there is enough data to begin registering search results.
   * @returns A boolean based on search readiness.
   */
  public readyToSearch() {
    return !!this.curSearchElementURL;
  }

  /**
   * Checks if there is enough data to begin using search results.
   * @returns A boolean based on result readiness.
   */
  public readyForResults() {
    return !!this.curSearchResultsURL;
  }

  /**
   * ==================================================
   * API MUTATION FUNCTIONS
   * ==================================================
   */

  /**
   * Mutates and adds the search element data to the driver for consumption.
   * @param data An object returned from the API representing the search element data.
   */
  protected saveSearchElements(data: Record<string, any>) {
    this.searchElements = Object.entries(data.ELEMENT)
      .map(([, element]: [string, any]) => {
        const prevElement = this.registeredElements.find(
          (el) =>
            this.convertID(el.id, 'elementURL') ===
            this.convertID(element.FORM_NAME, 'elementURL')
        );

        return {
          id: this.convertID(element.FORM_NAME, 'searchURL'),
          name: element.DISPLAY_NAME,
          type: element?.PARAM_TYPE,
          values:
            Object.entries(element?.OPTIONS?.OPTION || {})
              .map(([, i]: [string, any]) => ({
                value: i.VALUE,
                name: i.NAME
              }))
              .filter((i) => !!i.value) || undefined,
          private: !!prevElement?.private
        };
      })
      .sort(
        (a, b) =>
          this.registeredElements.findIndex(
            (el) => this.convertID(el.id, 'searchURL') === a.id
          ) -
          this.registeredElements.findIndex(
            (el) => this.convertID(el.id, 'searchURL') === b.id
          )
      );
  }

  /**
   * Mutates and adds the search results data to the driver for consumption.
   * @param data An object returned from the API representing the search results data.
   */
  protected saveSearchResults(data: Record<string, any>) {
    this.curSearchResultsVerbiage = data.SEARCHVERBIAGE.replace(
      /^(.*), sorted by.*$/g,
      '$1'
    );

    const programs = this.convertToArray(data.PROGRAM || []);

    this.searchResults = (
      Object.entries(programs) as Record<string, any>
    ).reduce((res: typeof this.searchResults, [, curProg]: any) => {
      if (res.every((p) => p.id !== curProg.PROGRAM_ID))
        res.push({
          id: curProg.PROGRAM_ID,
          name: curProg.PROGRAM_NAME,
          locations: []
        });

      res
        .find((p) => p.id === curProg.PROGRAM_ID)
        ?.locations.push({
          city: curProg.PROGRAM_CITY,
          country: curProg.PROGRAM_COUNTRY,
          region: curProg.PROGRAM_REGION,
          longitude: curProg.PROGRAM_LONGITUDE || 0,
          latitude: curProg.PROGRAM_LATITUDE || 0
        });

      return res;
    }, [] as typeof this.searchResults);
  }

  /**
   * Mutates and adds the program data to the driver for consumption.
   * @param data An object returned from the API representing the program specific data.
   */
  protected saveProgramData(data: Record<string, any>) {
    data = data.DETAILS;
    const res: any = {};

    res.id = data.PROGRAM_ID;

    res.name = data.PROGRAM_NAME;

    res.createdDate = data.PROGRAM_CREATED;

    res.modifiedDate = data.PROGRAM_MODIFIED;

    res.brochureText = data.PROGRAM_BROCHURE;

    res.active = !!data.PROGRAM_ACTIVE;

    res.terms = this.convertToArray(data.TERMS.TERM).map(
      (term) => term.PROGRAM_TERM
    );

    res.parameters = this.convertToArray(data.PARAMETERS.PARAMETER).reduce(
      (params: any[], param) => {
        const index = params.findIndex((p) => p.id === param.PARAM_ID);
        if (!params.length || index === -1)
          params.push({
            id: param.PARAM_ID,
            name: param.PROGRAM_PARAM_TEXT,
            type: param.PARAM_TYPE,
            value: []
          });

        params[index === -1 ? params.length - 1 : index].value.push(
          param.PARAM_VALUE
        );

        return params;
      },
      [] as { id: string; name: string; type: string; value: string[] }[]
    );

    res.infoLink = data?.INFO_REQUEST?.LINK?.HREF
      ? this.baseURL + data?.INFO_REQUEST?.LINK?.HREF
      : '';

    res.applyLink = data?.APPLY_NOW?.LINK?.HREF
      ? this.baseURL + data?.APPLY_NOW?.LINK?.HREF
      : '';

    res.dates = this.convertToArray(data.DATES.DATE)
      .map((date) => ({
        deadline: date.OVERRIDE,
        decision: date.OVERRIDE2,
        start: date.TERM_START,
        end: date.TERM_END,
        term: date.APP_TERM,
        year: date.APP_YEAR
      }))
      .reverse();

    res.locations = this.convertToArray(data.LOCATIONS.LOCATION).map((loc) => ({
      city: loc.PROGRAM_CITY,
      country: loc.PROGRAM_COUNTRY,
      region: loc.PROGRAM_REGION,
      longitude: loc.PROGRAM_LONGITUDE,
      latitude: loc.PROGRAM_LATITUDE
    }));

    const index = this.searchResults.findIndex((i) => i.id === res.id);
    if (index >= 0) this.searchResults[index] = res;
  }

  /**
   * ==================================================
   * API CALL FUNCTIONS
   * ==================================================
   */

  /**
   * Confirms all registered search elements and commits them by generating the URL and calling the API.
   * @returns The current instance of the driver.
   */
  public async confirmSearchElements() {
    this.curSearchElementURL = this.generateElementURL();
    const data = await $.getJSON(this.curSearchElementURL);
    this.saveSearchElements(data);
    return this;
  }

  /**
   * An optional refining process that uses all the current programs to limit locations and generate possible program names.
   * @returns The current instance of the driver.
   */
  public async refineSearchElements() {
    const url = this.generateResultsURL(true);
    const data = await $.getJSON(url);

    const refinableElements = this.basePossibleElements.filter(
      (el) => !!el.searchID
    );

    this.searchElements
      .filter((el) => refinableElements.some((i) => i.searchURL === el.id))
      .map((el) => {
        const key = this.convertID(el.id, 'searchID');
        el.values = data.PROGRAM.map((p: Record<string, any>) => p[key]).filter(
          this.onlyUnique
        );
      });

    return this;
  }

  /**
   * Confirms all registered searches and commits them by gneerating the URL and calling the API.
   * @returns The current instasnce of the driver
   */
  public async confirmSearchResults() {
    if (this.registeredResults.some((res) => res.id === this.customID)) {
      this.registeredResults
        .find((res) => res.id === this.customID)
        ?.value.forEach((custom) => {
          const el = this.searchElements.find((el) => el.id === this.customID);
          const cu = el?.values?.find((cus) => cus.value === custom);
          cu?.search && cu?.search();
        });

      this.registeredResults = this.registeredResults.filter(
        (res) => res.id !== this.customID
      );
    }

    this.curSearchResultsURL = this.generateResultsURL();

    const data = await $.getJSON(this.curSearchResultsURL);

    this.saveSearchResults(data);

    return this;
  }

  /**
   * An optional refining process that takes a given program and adds missing locations and other data like dates, terms, and parameters.
   * @param id A string representing the desired program ID.
   * @returns The current instance of the driver.
   */
  public async refineProgram(id: string) {
    this.checkProgramValid(id);

    const url = this.generateProgramDataURL(id);
    const data = await $.getJSON(url);

    this.saveProgramData(data);

    return this;
  }

  /**
   * ==================================================
   * REGISTRATION FUNCTIONS
   * ==================================================
   */

  /**
   * Used as a chain function after this.registerSearchElement to specify privacy.
   * @param index A number representing the index of the current key.
   * @param isPrivate A boolean representing privacy.
   * @returns The current instance of the driver.
   */
  protected changePrivacy(index: number, isPrivate: boolean) {
    this.registeredElements[index].private = isPrivate;
    return this;
  }

  /**
   * Used as a chain function after this.searchIn to specify permanency.
   * @param index A number representing the index of the current key.
   * @param isPermanent A boolean representing peranency.
   * @returns The current instance of the driver.
   */
  protected changePermanency(index: number, isPermanent: boolean) {
    this.registeredResults[index].permanent = isPermanent;
    return this;
  }

  /**
   * Resets Search Element Registration to begin registering new elements.
   */
  protected resetRegisteredElements() {
    this.curSearchElementURL = '';
    this.registeredElements = [];
  }

  /** Resets Search Results Registration to begin registering new search results. */
  public resetRegisteredResults() {
    this.curSearchResultsURL = '';
    this.curSearchResultsVerbiage = '';
    this.registeredResults = this.registeredResults.filter(
      (res) => res.permanent
    );
  }

  /**
   * Used as chain function after this.searchIn to search for a certain value.
   * @param index A number representing the index of the current key.
   * @param value A string representing the value to search for.
   * @returns helper functions 'or' (allows more values to be specified), and makePermanent/makeTemporary (allows permanency specification).
   */
  protected searchFor(index: number, value: string) {
    this.registeredResults[index].value.push(value);

    return {
      or: (val: string) => {
        return this.searchFor(index, val);
      },
      makePermanent: () => {
        return this.changePermanency(index, true);
      },
      makeTemporary: () => {
        return this.changePermanency(index, false);
      }
    };
  }

  /**
   * Register program searches for eventual confirmation.
   * @param id The id representing the key to search in.
   * @returns helper function 'for' (allows a value to be specified).
   */
  public searchIn(id: string) {
    this.checkSearchValueValid(id);

    if (this.readyForResults()) this.resetRegisteredResults();

    if (this.registeredResults.every((el) => el.id !== id))
      this.registeredResults.push({ id, value: [], permanent: false });

    const index = this.registeredResults.findIndex((el) => el.id === id);

    return {
      for: (value: string) => {
        return this.searchFor(index, value);
      }
    };
  }

  /**
   *
   * @param id The ID representing the search element name.
   * @returns helper function makePrivate/makePublic (allows privacy specification).
   */
  public registerSearchElement(id: string) {
    this.checkSearchElementValid(id);

    if (this.readyToSearch()) this.resetRegisteredElements();

    if (this.registeredElements.every((el) => el.id !== id))
      this.registeredElements.push({ id, private: false });

    const index = this.registeredElements.findIndex((el) => el.id === id);

    return {
      makePrivate: () => {
        return this.changePrivacy(index, true);
      },
      makePublic: () => {
        return this.changePrivacy(index, false);
      }
    };
  }

  /**
   * Adds the ability to register a custom search function just before confirming search results.
   * @param value A string representing the unique value of the search.
   * @param name A string representing the display name of the search.
   * @param searchFunction A function to be called when this search is registered.
   */
  public registerCustomSearch(
    value: string,
    name: string,
    searchFunction: () => any
  ) {
    if (!this.searchElements.some((el) => el.id === this.customID))
      this.searchElements.unshift({
        id: this.customID,
        name: this.customName,
        type: undefined,
        values: [],
        private: false
      });

    this.searchElements
      .find((el) => el.id === this.customID)
      ?.values?.push({ value, name, search: searchFunction });
  }
}

(async function () {
  const driver = new TDDriver();

  /*
  Register a Parameter or Search Element to make it searchable
  - Make it public to appear on the map
  - Make it private to hide from the map but allow programmtic filtering using this element
  */
  driver.registerSearchElement('11037').makePublic();
  driver.registerSearchElement('11032').makePublic();
  driver.registerSearchElement('11010').makePublic();
  driver.registerSearchElement('11043').makePublic();
  driver.registerSearchElement('11034').makePublic();
  driver.registerSearchElement('11035').makePublic();
  driver.registerSearchElement('11029').makePublic();
  driver.registerSearchElement('City').makePublic();
  driver.registerSearchElement('Country').makePublic();
  driver.registerSearchElement('Region').makePublic();
  driver.registerSearchElement('ProgramName').makePublic();

  driver.registerSearchElement('11009').makePrivate();
  driver.registerSearchElement('Term').makePrivate();
  driver.registerSearchElement('ProgramType').makePrivate();

  /* Get all of the search elements from TD */
  await driver.confirmSearchElements();

  /*
  Create your search query
  - makeTemporary if it should only apply to a single search
  - makePermanent if it should apply to all searches
  */
  driver.searchIn('11009').for('Faculty-Led Programs').makePermanent();

  /* Call this if you want to refine based on the current programs */
  await driver.refineSearchElements();

  driver.searchIn('pc').for('Croatia').or('Israel').makeTemporary();
  driver.searchIn('ProgramName').for('LU Send').makeTemporary();
  driver.searchIn('Region').for('Middle East').or('Europe').makeTemporary();

  await driver.confirmSearchResults();
  await driver.refineProgram('12346');
})();

(window as any).TDDriver = TDDriver;
