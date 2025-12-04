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
