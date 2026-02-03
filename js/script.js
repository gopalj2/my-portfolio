/* ================= HEADER SCROLL BEHAVIOR ================= */

let lastScrollY = window.scrollY;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    // scrolling down
    header.classList.add("hide");
  } else {
    // scrolling up
    header.classList.remove("hide");
  }

  lastScrollY = currentScrollY;
});
/* ================= TYPING EFFECT ================= */

function typeText(element, speed = 80) {
  const text = element.textContent;
  element.textContent = "";
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }

  type();
}

window.addEventListener("load", () => {
  const texts = document.querySelectorAll(".split-text");

  texts.forEach((el, i) => {
    setTimeout(() => {
      typeText(el, 80);
    }, i * 600); // delay between name & role
  });
});
/* ================= STATS COUNT UP ================= */

function animateCount(el, target, duration = 4000) {
  let start = 0;
  const increment = target / (duration / 16);

  function update() {
    start += increment;
    if (start < target) {
      el.textContent = Math.floor(start);
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  update();
}

window.addEventListener("load", () => {
  const counters = document.querySelectorAll(".count");

  counters.forEach(counter => {
    const target = +counter.dataset.target;
    animateCount(counter, target);
  });
});
/* ================= HERO CURSOR LIGHT ================= */

const hero = document.querySelector(".hero");
const heroLight = document.querySelector(".hero-cursor-light");

if (hero && heroLight && window.innerWidth > 768) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();

    heroLight.style.left = `${e.clientX - rect.left}px`;
    heroLight.style.top = `${e.clientY - rect.top}px`;
    heroLight.style.opacity = "1";
  });

  hero.addEventListener("mouseleave", () => {
    heroLight.style.opacity = "0";
  });
}
/* ================= SERVICES SCROLL ANIMATION ================= */

const services = document.querySelector(".services");
const cards = document.querySelectorAll(".service-card");

if (services && cards.length) {

  // scatter cards initially
cards.forEach((card, i) => {
  card.classList.add(
    i % 3 === 0 ? "scatter-left" : "scatter-right"
  );
});


  window.addEventListener("scroll", () => {
    const rect = services.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // progress from 0 → 1
    let progress = 1 - rect.top / windowHeight;
    progress = Math.min(Math.max(progress, 0), 1);

    // title reveal on enter
    if (progress > 0.25) {
  services.classList.add("active");
}

    // cards move into place
    cards.forEach((card) => {
      card.style.transform = `
        translateX(${(1 - progress) * (card.classList.contains("scatter-left") ? -120 : 120)}px)
        rotate(${(1 - progress) * (card.classList.contains("scatter-left") ? -8 : 8)}deg)
      `;
    });
  });
}
// ===== ABOUT BASIC LOGIC =====

const about = document.querySelector(".about");
const aboutTitle = document.getElementById("about-title");
const aboutText = document.querySelector(".about-text");

const title = "About Me";
let i = 0;
let started = false;

function typeTitle() {
  if (i < title.length) {
    aboutTitle.textContent += title.charAt(i);
    i++;
    setTimeout(typeTitle, 90);
  } else {
    about.classList.add("show-text");
  }
}

window.addEventListener("scroll", () => {
  const rect = about.getBoundingClientRect();
  const vh = window.innerHeight;

  if (rect.top < vh * 0.7 && !started) {
    about.classList.add("active");
    started = true;
    setTimeout(typeTitle, 400);
  }
});
// ===== SKILLS VISIBILITY =====

const skillCircles = document.querySelectorAll(".skill-circle");

window.addEventListener("scroll", () => {
  const vh = window.innerHeight;

  skillCircles.forEach((skill) => {
    const rect = skill.getBoundingClientRect();
    if (rect.top < vh * 0.8) {
      skill.classList.add("active");
    }
  });
});
// ===== SKILLS CIRCLE SYNC ANIMATION =====

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skill = entry.target;
        const targetPercent = parseInt(skill.dataset.percent);
        const ring = skill.querySelector(".skill-ring");
        const number = skill.querySelector(".skill-percent");

        let current = 0;
        const duration = 1600; // total animation time (ms)
        const stepTime = duration / targetPercent;

        const counter = setInterval(() => {
          current++;
          ring.style.setProperty("--percent", current);
          number.textContent = `${current}%`;

          if (current >= targetPercent) {
            clearInterval(counter);
          }
        }, stepTime);

        skillObserver.unobserve(skill);
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll(".skill-circle").forEach((skill) => {
  skillObserver.observe(skill);
});

/* ================= PORTFOLIO OBSERVER ================= */

const portfolioSection = document.querySelector(".portfolio");

if (portfolioSection) {
  const portfolioObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        portfolioSection.classList.add("active");
      }
    },
    { threshold: 0.3 }
  );

  portfolioObserver.observe(portfolioSection);
}

// ===== ABOUT SVG VISIBILITY =====

const aboutSection = document.querySelector(".about");
const aboutSVG = document.querySelector(".about-svg");

if (aboutSection && aboutSVG) {
  const aboutObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        aboutSVG.classList.add("active");
        aboutObserver.disconnect();
      }
    },
    { threshold: 0.4 }
  );

  aboutObserver.observe(aboutSection);
}
