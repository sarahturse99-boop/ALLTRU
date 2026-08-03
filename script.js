  // ---------- Slide selector (Executive Coaching, etc.) ----------
  function initSelector(groupName){
    var items = document.querySelectorAll('.selector-item[data-group="' + groupName + '"]');
    var panels = document.querySelectorAll('#' + (groupName === 'elp' ? 'elp-viewer' : 'adv-viewer') + ' .slide-panel');
    var viewer = document.getElementById(groupName === 'elp' ? 'elp-viewer' : 'adv-viewer');

    items.forEach(function(btn){
      btn.addEventListener('click', function(){
        var target = btn.getAttribute('data-target');

        items.forEach(function(b){
          var active = (b === btn);
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        panels.forEach(function(p){
          p.classList.toggle('is-active', p.getAttribute('data-panel') === target);
        });

        if (viewer){
          var rect = viewer.getBoundingClientRect();
          var navH = 82;
          if (rect.top < navH || rect.bottom > window.innerHeight){
            viewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }
  initSelector('elp');
  initSelector('adv');

  // ---------- Mobile menu ----------
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu){
    navToggle.addEventListener('click', function(){
      var open = mobileMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    mobileMenu.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        mobileMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // ---------- Reveal on scroll ----------
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  // ---------- Footer year ----------
  document.getElementById('year').textContent = '© ' + new Date().getFullYear();
