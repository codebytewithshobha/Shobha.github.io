/* ================================================================
   PORTFOLIO — script.js
   All interactivity: navbar, mobile menu, scroll animations,
   active nav highlighting, and footer year.
   ================================================================ */

/* ---------------------------------------------------------------
   1. SET CURRENT YEAR IN FOOTER
   --------------------------------------------------------------- */
document.getElementById('year').textContent = new Date().getFullYear();


/* ---------------------------------------------------------------
   2. NAVBAR — scroll shrink / border reveal
   --------------------------------------------------------------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


/* ---------------------------------------------------------------
   3. MOBILE NAV TOGGLE
   --------------------------------------------------------------- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

/* Close mobile menu when a link is clicked */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


/* ---------------------------------------------------------------
   4. ACTIVE NAV LINK — highlight based on scroll position
   --------------------------------------------------------------- */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  let currentId = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      currentId = section.id;
    }
  });

  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${currentId}`) {
      a.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav(); // run on load


/* ---------------------------------------------------------------
   5. SCROLL REVEAL — IntersectionObserver
   Elements with class "reveal" animate in when they enter view.
   --------------------------------------------------------------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        /* Optional: uncomment below to re-animate on scroll up
           revealObserver.unobserve(entry.target); */
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ---------------------------------------------------------------
   6. HERO — trigger reveal immediately on load
   --------------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
  /* Small delay so CSS transition fires visibly */
  setTimeout(() => {
    document.querySelectorAll('.hero-content .reveal').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
});


/* ---------------------------------------------------------------
   7. SMOOTH SCROLL for anchor links (fallback for older browsers)
   --------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});


/* ---------------------------------------------------------------
   8. SKILL ITEMS — subtle hover ripple effect
   --------------------------------------------------------------- */
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.querySelector('span').style.color = 'var(--text)';
  });
  item.addEventListener('mouseleave', () => {
    item.querySelector('span').style.color = '';
  });
});
