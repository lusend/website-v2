const element = document.getElementById('lusend-nav-drawer');
element.addEventListener('click', function (e) {
  const value = element.checked;
  let overflow = '';
  if (value) overflow = 'hidden';
  document.getElementsByTagName('body')[0].style.overflow = overflow;
});

function createDesktopButton(title, link) {
  $('#lusend-nav-items').append(
    $('<a></a>')
      .addClass('btn btn-ghost rounded-btn')
      .attr('href', link)
      .text(title)
  );
}

function createMobileButton(title, link) {
  $('#lusend-nav-drawer-login').append(
    $('<li></li>').append($('<a></a>').attr('href', link).text(title))
  );
}

// Logged In and Has Admin Console Button
if ($('#pagenav a:contains(Admin Console)').length >= 1) {
  createDesktopButton('Admin Console', '/index.cfm?FuseAction=Portal.Home');
  createMobileButton('Admin Console', '/index.cfm?FuseAction=Portal.Home');
}

// Logged In and Has Applicant Button
if ($('#pagenav a:contains(Applicant)').length >= 1) {
  createDesktopButton(
    'My Applications',
    '/index.cfm?FuseAction=Students.AngularHome'
  );
  createMobileButton(
    'My Applications',
    '/index.cfm?FuseAction=Students.AngularHome'
  );
}

// Logged In and Has Logout Button
if ($('#pagenav a:contains(Logout)').length >= 1) {
  $('[data-lusend-login]')
    .text('Logout')
    .attr('href', '/index.cfm?FuseAction=Security.Logout');
}
