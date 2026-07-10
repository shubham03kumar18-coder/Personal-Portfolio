/* ============================================================
   SUBHAM KUMAR — PORTFOLIO  |  Vanilla JS ES6
   ============================================================ */

'use strict';

/* ── HAMBURGER ── */
(function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // close on nav link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}());

/* ── NAVBAR SCROLL SHADOW + ACTIVE LINK ── */
(function initScrollBehaviours() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // shadow
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);

    // active link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}());

/* ── INTERSECTION OBSERVER — REVEAL ANIMATIONS ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseFloat(el.dataset.delay || 0) * 90; // ms
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => observer.observe(el));
}());

/* ── 3D TILT — PROFILE PHOTO ── */
(function initPhotoTilt() {
  const card = document.getElementById('photoCard');
  if (!card) return;

  // disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const lerp    = (a, b, t) => a + (b - a) * t;
  let rafId     = null;
  let floatId   = null;
  let hovering  = false;
  let floatT    = 0;

  const cur = { rx: 0, ry: 0, sc: 1, gx: 50, gy: 50 };
  const tgt = { rx: 0, ry: 0, sc: 1, gx: 50, gy: 50 };
  const sheen = card.querySelector('.photo-sheen');

  function commit() {
    const { rx, ry, sc, gx, gy } = cur;
    card.style.transform   = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${sc})`;
    const ox = -ry * 1.1, oy = rx * 1.1;
    card.style.boxShadow   =
      `${ox}px ${oy}px 38px rgba(37,99,235,0.38),` +
      `${ox*0.4}px ${oy*0.4}px 70px rgba(37,99,235,0.16),` +
      `0 20px 56px rgba(0,0,0,0.22)`;
    if (sheen) {
      sheen.style.background =
        `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;
    }
  }

  function tick() {
    const sp = hovering ? 0.13 : 0.075;
    cur.rx = lerp(cur.rx, tgt.rx, sp);
    cur.ry = lerp(cur.ry, tgt.ry, sp);
    cur.sc = lerp(cur.sc, tgt.sc, sp);
    cur.gx = lerp(cur.gx, tgt.gx, sp);
    cur.gy = lerp(cur.gy, tgt.gy, sp);
    commit();
    const moving =
      Math.abs(cur.rx - tgt.rx) > 0.004 ||
      Math.abs(cur.ry - tgt.ry) > 0.004 ||
      Math.abs(cur.sc - tgt.sc) > 0.0004;
    rafId = moving ? requestAnimationFrame(tick) : null;
  }

  function kick() {
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  // idle float animation
  function float() {
    if (!hovering) {
      floatT += 0.012;
      tgt.rx = Math.sin(floatT) * 3.8;
      tgt.ry = Math.cos(floatT * 0.75) * 2.8;
      kick();
    }
    floatId = requestAnimationFrame(float);
  }
  floatId = requestAnimationFrame(float);

  card.addEventListener('mousemove', e => {
    if (!hovering) return;
    const r  = card.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    tgt.rx = -dy * 13;
    tgt.ry =  dx * 13;
    tgt.sc = 1.03;
    tgt.gx = 50 + dx * 28;
    tgt.gy = 50 + dy * 28;
    kick();
  });

  card.addEventListener('mouseenter', () => {
    hovering = true;
    tgt.sc = 1.03;
    kick();
  });

  card.addEventListener('mouseleave', () => {
    hovering = false;
    tgt.rx = 0; tgt.ry = 0; tgt.sc = 1; tgt.gx = 50; tgt.gy = 50;
    kick();
  });

  // pause float on tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && floatId) {
      cancelAnimationFrame(floatId);
      floatId = null;
    } else if (!document.hidden && !floatId) {
      floatId = requestAnimationFrame(float);
    }
  });
}());

/* ── 3D TILT — SKILL CARDS ── */
(function initSkillCardTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('.skill-card').forEach(card => {
    const lerp = (a, b, t) => a + (b - a) * t;
    let rafId = null, hov = false;
    const cur = { rx: 0, ry: 0 };
    const tgt = { rx: 0, ry: 0 };

    // read accent-rgb from computed style
    const style   = getComputedStyle(card);
    const aRgb    = style.getPropertyValue('--accent-rgb').trim() || '37,99,235';

    function commit() {
      card.style.transform  =
        `perspective(700px) rotateX(${cur.rx}deg) rotateY(${cur.ry}deg) translateY(${hov ? -6 : 0}px)`;
      card.style.boxShadow  = hov
        ? `${-cur.ry*0.9}px ${cur.rx*0.9}px 30px rgba(${aRgb},0.28), 0 12px 36px rgba(0,0,0,0.16)`
        : `0 2px 12px rgba(0,0,0,0.07)`;
      card.style.borderColor = hov
        ? `rgba(${aRgb},0.30)`
        : 'rgba(255,255,255,0.06)';
    }

    function tick() {
      const sp = hov ? 0.14 : 0.08;
      cur.rx = lerp(cur.rx, tgt.rx, sp);
      cur.ry = lerp(cur.ry, tgt.ry, sp);
      commit();
      const moving =
        Math.abs(cur.rx - tgt.rx) > 0.003 ||
        Math.abs(cur.ry - tgt.ry) > 0.003;
      rafId = moving ? requestAnimationFrame(tick) : null;
    }

    function kick() {
      if (!rafId) rafId = requestAnimationFrame(tick);
    }

    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
      const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
      tgt.rx = -dy * 8; tgt.ry = dx * 8;
      kick();
    });

    card.addEventListener('mouseenter', () => { hov = true;  kick(); });
    card.addEventListener('mouseleave', () => {
      hov = false; tgt.rx = 0; tgt.ry = 0; kick();
    });
  });
}());

/* ── CONTACT CARD HOVER (touch-friendly lift) ── */
(function initContactCards() {
  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}());

/* ── PROJECT CARD TILT ── */
(function initProjectTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('.project-card').forEach(card => {
    const lerp = (a, b, t) => a + (b - a) * t;
    let rafId = null, hov = false;
    const cur = { rx: 0, ry: 0 };
    const tgt = { rx: 0, ry: 0 };

    function commit() {
      card.style.transform =
        `perspective(900px) rotateX(${cur.rx}deg) rotateY(${cur.ry}deg) translateY(${hov ? -4 : 0}px)`;
    }

    function tick() {
      cur.rx = lerp(cur.rx, tgt.rx, hov ? 0.12 : 0.07);
      cur.ry = lerp(cur.ry, tgt.ry, hov ? 0.12 : 0.07);
      commit();
      const m = Math.abs(cur.rx - tgt.rx) > 0.003 || Math.abs(cur.ry - tgt.ry) > 0.003;
      rafId = m ? requestAnimationFrame(tick) : null;
    }

    function kick() { if (!rafId) rafId = requestAnimationFrame(tick); }

    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      tgt.rx = -((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 5;
      tgt.ry =  ((e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)) * 5;
      kick();
    });
    card.addEventListener('mouseenter', () => { hov = true;  kick(); });
    card.addEventListener('mouseleave', () => { hov = false; tgt.rx = 0; tgt.ry = 0; kick(); });
  });
}());

/* ── EXTERNAL LINKS — security ── */
document.querySelectorAll('a[target="_blank"]').forEach(a => {
  a.setAttribute('rel', 'noopener noreferrer');
});

/* ── LOCAL STORAGE — last visited section ── */
(function initLocalStorage() {
  const secs = document.querySelectorAll('section[id]');

  // Save last visited section on scroll
  window.addEventListener('scroll', () => {
    let current = 'home';
    secs.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    localStorage.setItem('lastSection', current);
  }, { passive: true });

  // Restore last visited section on load
  const last = localStorage.getItem('lastSection') || 'home';
  const lastLink = document.querySelector(`.nav-link[data-section="${last}"]`);
  if (lastLink) lastLink.classList.add('was-active');
}());

/* ── HERO ENTRANCE ANIMATION ── */
window.addEventListener('load', () => {
  const heroText  = document.querySelector('.hero-text');
  const heroPhoto = document.querySelector('.hero-photo');
  if (heroText)  heroText.classList.add('visible');
  if (heroPhoto) heroPhoto.classList.add('visible');
});
