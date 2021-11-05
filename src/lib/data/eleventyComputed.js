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
  },
  link:
    (data) =>
    (page, collectionName = 'pages') => {
      const currentCollection = data.collections[collectionName];
      const check = (item) => item.fileSlug === page || item.data.slug === page;
      return currentCollection?.find(check)?.data?.path || '#';
    },
  eleventyNavigation: {
    key: (data) => data.key || data.slug || data.page.fileSlug,
    // title: (data) => data.title || data.key || data.slug || data.page.fileSlug,
    parent: (data) => data.parent
  }
};
