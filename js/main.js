/* =========================================================
   Muhammad Younus | Web Development
   Edit the SETTINGS and PROJECTS below. Nothing else is needed.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- SETTINGS ---------- */
  var SETTINGS = {
    whatsapp: '923286868264',               // country code + number, no + or spaces
    email: 'mayoyounis999@gmail.com'
  };

  /* ---------- PROJECTS ----------
     Add your real work here. Do not add projects you did not build.
     Example:
     { title: 'Dental Clinic Website', kind: 'Business website',
       text: 'Custom 8-page website with booking and Google Maps.',
       image: 'assets/clinic.jpg', link: 'https://example.com' }
  */
  var PROJECTS = [];

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Header: shadow on scroll ---------- */
  var header = $('.site-header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var menuBtn = $('#menuBtn');
  var menu = $('#menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', function () {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });
  $$('a', menu).forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ---------- Active nav link ---------- */
  var navLinks = $$('.menu a[href^="#"]:not(.btn)');
  var sections = navLinks.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navObs.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var revObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { revObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Footer year ---------- */
  var yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Portfolio ---------- */
  var grid = $('#projectGrid');
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function renderProjects() {
    if (!grid) return;
    if (!PROJECTS.length) {
      grid.innerHTML = [1, 2, 3].map(function () {
        return '<article class="card project placeholder"><div class="thumb">Your project here</div>' +
          '<div class="body"><p class="kind">Coming soon</p><h3>Next project</h3>' +
          '<p>Your website could be featured here. Send me a message to start.</p></div></article>';
      }).join('');
      return;
    }
    grid.innerHTML = PROJECTS.map(function (p) {
      var img = p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy">' : 'Project';
      var link = p.link ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">View website</a>' : '';
      return '<article class="card project reveal in"><div class="thumb">' + img + '</div><div class="body">' +
        '<p class="kind">' + esc(p.kind || 'Website') + '</p><h3>' + esc(p.title) + '</h3>' +
        '<p>' + esc(p.text || '') + '</p>' + link + '</div></article>';
    }).join('');
  }
  renderProjects();

  /* ---------- Select a package from a pricing button ---------- */
  var pkgSelect = $('#cPackage');
  function selectPackage(label) {
    for (var i = 0; i < pkgSelect.options.length; i++) {
      if (pkgSelect.options[i].text === label) { pkgSelect.selectedIndex = i; break; }
    }
  }
  $$('[data-package]').forEach(function (btn) {
    btn.addEventListener('click', function () { selectPackage(btn.getAttribute('data-package')); });
  });

  /* ---------- Package finder ---------- */
  var finder = $('#finder');
  var result = $('#finderResult');
  var finderError = $('#finderError');

  function recommend(goal, pages, support) {
    // Booking, big sites, or wanting support means Premium.
    if (goal === 'booking' || pages === 'large' || support === 'yes') {
      var why = [];
      if (goal === 'booking') why.push('you want visitors to book or send enquiries');
      if (pages === 'large') why.push('you may need more than 10 pages');
      if (support === 'yes') why.push('you want help after launch');
      return { key: 'Premium', title: 'Premium Website',
        text: 'Premium fits because ' + why.join(', and ') + '. It includes a booking or enquiry system, social media integration, Google visibility setup, advanced mobile optimization, and 1 month of support.' };
    }
    if (goal === 'local' || pages === 'medium') {
      var why2 = [];
      if (goal === 'local') why2.push('your customers look for your location and message you on WhatsApp');
      if (pages === 'medium') why2.push('you need 6 to 10 pages');
      return { key: 'Standard', title: 'Business Website',
        text: 'Standard fits because ' + why2.join(', and ') + '. It includes up to 10 pages, custom design, a services or portfolio section, Google Maps, WhatsApp integration, and SEO setup.' };
    }
    return { key: 'Basic', title: 'Starter Website',
      text: 'Basic is enough for you. You need up to 5 pages so people can see who you are and contact you. It includes mobile-friendly design, a contact form, and basic SEO. You can grow later.' };
  }

  if (finder) {
    finder.addEventListener('submit', function (e) {
      e.preventDefault();
      var goal = (finder.querySelector('input[name="goal"]:checked') || {}).value;
      var pages = (finder.querySelector('input[name="pages"]:checked') || {}).value;
      var support = (finder.querySelector('input[name="support"]:checked') || {}).value;
      if (!goal || !pages || !support) { finderError.hidden = false; return; }
      finderError.hidden = true;
      var r = recommend(goal, pages, support);
      $('#resultTitle').textContent = r.title;
      $('#resultText').textContent = r.text;
      $('#resultBtn').onclick = function () { selectPackage(r.key); };
      result.hidden = false;
      result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    $('#resultReset').addEventListener('click', function () {
      finder.reset();
      result.hidden = true;
      finder.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ---------- Contact form (opens WhatsApp or email, no server needed) ---------- */
  var form = $('#contactForm');
  var contactError = $('#contactError');

  function buildMessage() {
    var name = $('#cName').value.trim();
    var email = $('#cEmail').value.trim();
    var pkg = pkgSelect.value;
    var msg = $('#cMessage').value.trim();
    if (!name || !msg) { contactError.hidden = false; return null; }
    contactError.hidden = true;
    var lines = ['Hello Muhammad, my name is ' + name + '.',
      'Interested in: ' + pkg + '.',
      'About my business: ' + msg];
    if (email) lines.push('My email: ' + email);
    return { text: lines.join('\n'), subject: 'Website enquiry: ' + pkg + ' (' + name + ')' };
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var m = buildMessage();
      if (!m) return;
      window.open('https://wa.me/' + SETTINGS.whatsapp + '?text=' + encodeURIComponent(m.text), '_blank', 'noopener');
    });
    $('#sendEmail').addEventListener('click', function () {
      var m = buildMessage();
      if (!m) return;
      window.location.href = 'mailto:' + SETTINGS.email + '?subject=' + encodeURIComponent(m.subject) +
        '&body=' + encodeURIComponent(m.text);
    });
  }
})();
