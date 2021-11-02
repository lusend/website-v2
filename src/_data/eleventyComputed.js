const { NODE_ENV } = process.env;

module.exports = {
  path: (data) => {
    // generate a link to the page based on the environment
    if (NODE_ENV === 'development') return `${data.page.filePathStem}`;
    return `/?go=${data.slug || data.page.fileSlug}`;
  },
  permalink: (data) => {
    // generate the output file for the page based on the environment
    if (NODE_ENV === 'development') {
      if (!data.page.fileSlug) return `/index.html`;
      return `${data.page.filePathStem}/index.html`;
    }
    if (!data.page.fileSlug) return false;
    return `${data.slug || data.page.fileSlug}.html`;
  }
};
