//MENU HAMBURGER

const btn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

btn.addEventListener("click", () => {
    btn.classList.toggle("open");

    if (mobileMenu.style.display === "block") {
        mobileMenu.style.display = "none";
    } else {
        mobileMenu.style.display = "block";
    }
});


//EFEITO SECTION 'SOBRE'
const section = document.querySelector('.sobre-origem');

function revealOnScroll() {
    const position = section.getBoundingClientRect().top;
    const screen = window.innerHeight * 0.8;

    if (position < screen) {
        section.classList.add('visible');
    }
}

window.addEventListener('scroll', revealOnScroll);


//CARROSSEL HERO

const slides = document.querySelectorAll(".banner-slide");
const indicators = document.querySelectorAll(".indicator");

let index = 0;

function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    indicators.forEach(dot => dot.classList.remove("active"));

    slides[i].classList.add("active");
    indicators[i].classList.add("active");
}

indicators.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        showSlide(index);
    });
});

setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
}, 5000);


//CARDS EQUIPE
const teamSlider = document.querySelector('.team-carousel');
const teamLeft = document.querySelector('.team-nav.left');
const teamRight = document.querySelector('.team-nav.right');

teamLeft.onclick = () => teamSlider.scrollLeft -= 300;
teamRight.onclick = () => teamSlider.scrollLeft += 300;


//LOCALIZAÇÃO GOOGLE MAPS

// Aplica classe .visible quando a section entrar na viewport
(function () {
    const section = document.querySelector('.location-large');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add('visible');
                observer.unobserve(section);
            }
        });
    }, { threshold: 0.18 });

    observer.observe(section);
})();


//ANIMAR SECTIONS

function animarScroll() {
    const elements = document.querySelectorAll('.animar');
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        const posicao = el.getBoundingClientRect().top;

        if (posicao < windowHeight - 100) {
            el.classList.add('mostrar');
        }
    });
}

window.addEventListener('scroll', animarScroll);
window.addEventListener('load', animarScroll);

//ANIMAR ITENS DA SECTION

    (function () {
  // Config
  const selector = '.animate';
    const rootMargin = '0px 0px -12% 0px'; // dispara um pouco antes do elemento chegar ao fim da tela
    const threshold = 0.12;

    // Helpers
    function applyTiming(el) {
    const d = el.dataset.delay;
    const dur = el.dataset.duration;
    if (d) el.style.transitionDelay = `${parseInt(d)}ms`;
    if (dur) el.style.transitionDuration = `${parseInt(dur)}ms`;
  }

    function revealElement(el) {
    // evita re-animar se já animado
    if (el.dataset.__animated === 'true') return;
    el.classList.add('in-view');
    el.dataset.__animated = 'true';
  }

    // IntersectionObserver approach
    if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealElement(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, {root: null, rootMargin, threshold });

    // Observe each animate element after applying timing
    document.querySelectorAll(selector).forEach(el => {
      // skip if user prefers reduced motion
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.style.transition = 'none';
    el.style.opacity = 1;
    el.style.transform = 'none';
    el.dataset.__animated = 'true';
    return;
      }
    applyTiming(el);
    observer.observe(el);
    });

  } else {
    // Fallback robusto sem IntersectionObserver
    const els = Array.from(document.querySelectorAll(selector));

    function checkVisibilityFallback() {
      const vh = window.innerHeight;
    const offset = 120;
      els.forEach(el => {
        if (el.dataset.__animated === 'true') return;
    const r = el.getBoundingClientRect();
    if (r.top < vh - offset) {
        revealElement(el);
        }
      });
    }

    // Apply timing and run checks
    els.forEach(el => {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.style.transition = 'none';
    el.style.opacity = 1;
    el.style.transform = 'none';
    el.dataset.__animated = 'true';
    return;
      }
    applyTiming(el);
    });

    window.addEventListener('scroll', throttle(checkVisibilityFallback, 80), {passive: true });
    window.addEventListener('resize', throttle(checkVisibilityFallback, 200));
    window.addEventListener('load', checkVisibilityFallback);
    setTimeout(checkVisibilityFallback, 300);
  }

    // small throttle utility
    function throttle(fn, wait) {
        let t = null;
    return function () {
      if (t) return;
      t = setTimeout(() => {
        fn();
    t = null;
      }, wait);
    };
  }

})();


