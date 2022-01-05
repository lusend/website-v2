function generateLimitCharsModal(modalClass, btnText, text, subtitle) {
  return $(`<div class='${modalClass}'></div>`).append(
    $(
      `<label for='${modalClass}-label' class='link modal-button'></label>`
    ).html(btnText),
    `<input type='checkbox' id='${modalClass}-label' class='modal-toggle' />`,
    $(`<div class='modal'></div>`).append(
      `<label for='${modalClass}-label' class='w-full h-full absolute m-0 p-0'>&nbsp;</label>`,
      $(`<div class='modal-box max-h-[70%] overflow-y-auto'></div>`).append(
        $(`<p></p>`).html(text),
        $(`<div></div>`).html(subtitle),
        $(`<div class='modal-action'></div>`).append(
          `<label for='${modalClass}-label' class='btn btn-primary'>Close</label>`
        )
      )
    )
  );
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
  var possibleTitle =
    ($(this).siblings('.limit-chars-title').html() || '')
      .trim()
      .replace(/\n {2,}/g, ' ') + ' ';

  var modalClass = 'limit-chars-' + index;
  var textClass = modalClass + '-text';

  $(this).html('');
  $(this).append($(`<span class='${textClass}'></span>`).html(allText));

  if (allText.length > max) {
    $(`.${textClass}`).html(someText);
    $(this).append(
      generateLimitCharsModal(modalClass, 'See More', allText, possibleTitle)
    );
  }
});
