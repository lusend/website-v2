const { DateTime } = require('luxon');

const postDate = (dateObj) => {
  return DateTime.fromJSDate(dateObj).toUTC().toLocaleString(DateTime.DATE_MED);
};

// allow environment variables to be used within templates
const env = (key) => process.env[key];

const log = (value) => {
  console.log(value);
};

const yesno = (value, yes, no) => (value ? yes : no);

module.exports = {
  postDate,
  env,
  log,
  yesno
};
