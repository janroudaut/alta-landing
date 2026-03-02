/* ========================================
   ALTA Landing Page — JS
   Toggle FR/EN + Scroll animations + Navbar
   ======================================== */

(function () {
  'use strict';

  // --- Language toggle ---

  function detectLang() {
    var stored = localStorage.getItem('alta-lang');
    if (stored === 'fr' || stored === 'en') return stored;
    return navigator.language.startsWith('fr') ? 'fr' : 'en';
  }

  function setLang(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('alta-lang', lang);
    document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.setLang === lang);
    });
  }

  setLang(detectLang());

  document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.dataset.setLang);
    });
  });

  // --- Navbar scroll effect ---

  var navbar = document.querySelector('.navbar');
  var heroSection = document.querySelector('.hero');

  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else if (heroSection) {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // Hide scroll hint after first scroll
  var scrollHint = document.querySelector('.hero-scroll-hint');
  if (scrollHint) {
    var hintHidden = false;
    window.addEventListener('scroll', function () {
      if (!hintHidden && window.scrollY > 100) {
        scrollHint.style.opacity = '0';
        scrollHint.style.transition = 'opacity 0.5s';
        hintHidden = true;
      }
    }, { passive: true });
  }

  // --- Scroll reveal (IntersectionObserver) ---

  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Pipeline stagger animation ---

  var pipelineItems = document.querySelectorAll('.pipeline-node, .pipeline-arrow');

  if ('IntersectionObserver' in window && pipelineItems.length > 0) {
    var pipelineObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          pipelineItems.forEach(function (item, i) {
            setTimeout(function () {
              item.classList.add('visible');
            }, i * 200);
          });
          pipelineObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });

    pipelineObserver.observe(pipelineItems[0]);
  }

  // --- Active navbar link tracking ---

  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.navbar-links a');

  if ('IntersectionObserver' in window && sections.length > 0 && navLinks.length > 0) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'var(--text-title)';
            } else {
              link.style.color = '';
            }
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }
})();
