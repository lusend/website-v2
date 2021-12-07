function generateLimitCharsLink(cls, text) {
  return `<a class='link ${cls}'>${text}</a>`;
}

$('.limit-chars').each(function (index) {
  var max = +$(this).attr('max') || 280;

  var allText =
    $(this)
      .html()
      .trim()
      .replace(/\n {2,}/g, ' ') + ' ';
  var regex = new RegExp(`.{1,${max}}(\\s|$)`, 'g');
  var someText = allText.match(regex)[0] + ' ... ';

  var linkClass = 'limit-chars-' + index;
  var textClass = linkClass + '-text';

  $(this).html('');
  $(this).append($(`<span class='${textClass}'></span>`).html(allText));

  if (allText.length > max) {
    $(`.${textClass}`).html(someText);
    $(this).append(generateLimitCharsLink(linkClass, 'See More'));
  }

  $(`.${linkClass}`).on('click', function () {
    if ($(this).text() === 'See More') {
      $(this).text('See Less');
      $(`.${textClass}`).html(allText);
    } else {
      $(this).text('See More');
      $(`.${textClass}`).html(someText);
    }
  });
});
