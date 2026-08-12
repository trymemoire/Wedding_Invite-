const door = document.querySelector('.door-scene');
const enterBtn = document.getElementById('enterBtn');
const progress = document.querySelector('.progress span');
const backTop = document.getElementById('backTop');

enterBtn.addEventListener('click', () => {
  const weddingMusic = document.getElementById('weddingMusic');
  if (weddingMusic) {
    weddingMusic.volume = 0.35;
    weddingMusic.play().catch(() => {
      // Autoplay may still be blocked by the browser; that's fine — stay silent.
    });
  }
  door.classList.add('opened');
  setTimeout(() => {
    document.getElementById('invitation').scrollIntoView({behavior:'smooth'});
  }, 850);
  startAutoScroll();
});

backTop.addEventListener('click', () => {
  document.getElementById('door').scrollIntoView({behavior:'smooth'});
});

const scenes = [...document.querySelectorAll('.scene, .closing-scene')];
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('is-active', entry.isIntersecting);
  });
}, {threshold:0.48});
scenes.forEach(s => io.observe(s));

window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${Math.max(0, Math.min(100, scrollY / h * 100))}%`;
}, {passive:true});

// Small scroll-driven parallax: only transform the image layer, never the text.
window.addEventListener('scroll', () => {
  const vh = innerHeight;
  document.querySelectorAll('.event-scene').forEach(scene => {
    const r = scene.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh + 100) return;
    const center = (r.top + r.height/2) - vh/2;
    const shift = Math.max(-18, Math.min(18, -center/30));
    const img = scene.querySelector('.event-image img');
    if (img) img.style.translate = `0 ${shift}px`;
  });
}, {passive:true});

// Mobile browser viewport stabilization.
// Keeps full-screen scenes aligned when iOS/Android browser chrome expands or collapses.
function setViewportUnit() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  document.documentElement.style.setProperty('--screen-width', `${window.innerWidth}px`);
}
setViewportUnit();
window.addEventListener('resize', setViewportUnit, {passive:true});
window.addEventListener('orientationchange', () => setTimeout(setViewportUnit, 250), {passive:true});

// Prevent accidental double-tap zoom on the invitation controls while preserving normal page zoom.
document.querySelectorAll('button, .back-top').forEach(el => {
  el.style.touchAction = 'manipulation';
});
/* =========================================================
   VENUE + CONTACT JAVASCRIPT
   ========================================================= */

/*
   OPTIONAL:
   Add these elements if you want a small reveal animation
   when the section enters the screen.
*/

const venueSection = document.querySelector(
  ".venue-contact-section"
);

if (venueSection) {

  const venueObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          venueSection.classList.add("venue-visible");
        }

      });

    },
    {
      threshold: 0.15
    }
  );

  venueObserver.observe(venueSection);
}

/* =========================================================
   AUTO-SCROLL — advances one slide every 30s of inactivity.
   Any manual scroll, touch, or key input resets the timer,
   so the person can always scroll at their own pace.
   ========================================================= */
(function () {
  const AUTO_SCROLL_MS = 17000;
  const slides = [...document.querySelectorAll(
    'main > .scene, main > .closing-scene, #venue, #contacts'
  )];

  let timer = null;

  function currentIndex() {
    let idx = 0;
    let closest = Infinity;
    slides.forEach((slide, i) => {
      const dist = Math.abs(slide.getBoundingClientRect().top);
      if (dist < closest) { closest = dist; idx = i; }
    });
    return idx;
  }

  function tick() {
    const next = slides[currentIndex() + 1];
    if (next) {
      next.scrollIntoView({behavior: 'smooth'});
      arm();
    }
    // If we're already on the last slide, auto-scroll simply stops.
  }

  function arm() {
    clearTimeout(timer);
    timer = setTimeout(tick, AUTO_SCROLL_MS);
  }

  window.startAutoScroll = arm;

  // Any deliberate scroll/touch/key interaction pushes the next
  // auto-advance back by another full 30s, so it never fights the guest.
  ['wheel', 'touchstart', 'keydown'].forEach((evt) => {
    window.addEventListener(evt, arm, {passive: true});
  });
})();