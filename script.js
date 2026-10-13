(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var links = Array.prototype.slice.call(nav.querySelectorAll('a'));

  function setOpen(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(!nav.classList.contains('open'));
  });

  links.forEach(function (link) {
    link.addEventListener('click', function () { setOpen(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  // Highlight the nav button for the section currently in view.
  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (link) {
      var match = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', match);
      if (match) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  function onScroll() {
    var offset = window.innerHeight * 0.3;
    var current = sections[0].id;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= offset) current = section.id;
    });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      current = sections[sections.length - 1].id;
    }
    setActive(current);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
