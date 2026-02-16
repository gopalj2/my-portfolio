console.log("JS FILE LOADED");
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
/// ===== ABOUT SECTION LOGIC (HOME + ABOUT PAGE SAFE) =====

const about = document.querySelector(".about");
const aboutTitle = document.getElementById("about-title");

if (about && aboutTitle) {
  const titleText = "About Me";
  let index = 0;
  let typed = false;

  function typeTitle() {
    if (index < titleText.length) {
      aboutTitle.textContent += titleText.charAt(index);
      index++;
      setTimeout(typeTitle, 90);
    } else {
      about.classList.add("show-text");
    }
  }

  function activateAbout() {
    if (typed) return;
    typed = true;
    about.classList.add("active");
    setTimeout(typeTitle, 300);
  }

  // 👉 ABOUT PAGE: activate immediately
  if (document.body.classList.contains("about-page")) {
    activateAbout();
  }

  // 👉 HOME PAGE: activate on scroll
  window.addEventListener("scroll", () => {
    const rect = about.getBoundingClientRect();
    const vh = window.innerHeight;

    if (rect.top < vh * 0.7) {
      activateAbout();
    }
  });
}


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

/* ================= PORTFOLIO + VISUAL OBSERVER ================= */

const portfolioSections = document.querySelectorAll(
  ".portfolio, .visual-portfolio"
);

if (portfolioSections.length) {
  const portfolioObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.3 }
  );

  portfolioSections.forEach((section) => {
    portfolioObserver.observe(section);
  });
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
/* ================= PORTFOLIO FILTER LOGIC ================= */

const portfolioSectionEl = document.querySelector(".portfolio");
const filterButtons = portfolioSectionEl
  ? portfolioSectionEl.querySelectorAll(".portfolio-filters button")
  : [];

const portfolioCards = portfolioSectionEl
  ? portfolioSectionEl.querySelectorAll(".portfolio-card")
  : [];


filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // active button
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    portfolioCards.forEach(card => {
      const categories = card.getAttribute("data-category");

      if (filter === "all" || categories.includes(filter)) {
  card.style.display = "block";

  // trigger animation
  setTimeout(() => {
    card.classList.remove("is-hidden");
    card.classList.add("is-visible");
  }, 10);

} else {
  card.classList.remove("is-visible");
  card.classList.add("is-hidden");

  setTimeout(() => {
    card.style.display = "none";
  }, 300);
}


    });
  });
});
/* ================= VISUAL PORTFOLIO FILTER LOGIC ================= */

const visualSection = document.querySelector(".visual-portfolio");

if (visualSection) {
  const visualFilterButtons =
    visualSection.querySelectorAll(".portfolio-filters button");
  const visualCards =
    visualSection.querySelectorAll(".visual-card");

  visualFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // active button
      visualFilterButtons.forEach((btn) =>
        btn.classList.remove("active")
      );
      button.classList.add("active");

      const filter = button.textContent.toLowerCase();

      visualCards.forEach((card) => {
        const category = card.dataset.category;

        if (filter === "all" || category === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.92)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}
// ================= VISUAL POPUP LOGIC =================
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("visualPopup");
  const popupImg = document.getElementById("visualPopupImg");
  const popupTitle = document.getElementById("visualPopupTitle");
  const popupDesc = document.getElementById("visualPopupDesc");
  const popupClose = document.querySelector(".visual-popup-close");
  const popupOverlay = document.querySelector(".visual-popup-overlay");

  if (!popup) return; // safety guard

  document.querySelectorAll(".visual-card").forEach(card => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const title = card.querySelector("h3");
      const desc = card.querySelector("p");

      popupImg.src = img.src;
      popupTitle.textContent = title.textContent;
      popupDesc.textContent = desc.textContent;

popup.classList.add("show");
document.body.style.overflow = "hidden";
    });
  });

  function closePopup() {
  popup.classList.remove("show");
  document.body.style.overflow = "";
}

  popupClose.addEventListener("click", closePopup);
  popupOverlay.addEventListener("click", closePopup);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && popup.classList.contains("show")) {
    closePopup();
  }
});
/* ================= CONTACT SCROLL ================= */

const contactSection = document.querySelector(".contact");

if (contactSection) {
  const contactObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        contactSection.classList.add("active");
      }
    },
    { threshold: 0.3 }
  );

  contactObserver.observe(contactSection);
}
/* ================= HEADER ACTIVE SECTION ================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120; // header offset
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
/* ================= MOBILE MENU TOGGLE ================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (!menuToggle || !mobileNav) {
    console.warn("Menu toggle or mobile nav not found");
    return;
  }

  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
  });
});

// ===== CLOSE MOBILE MENU ON LINK CLICK (MOBILE ONLY) =====

const mobileLinks = document.querySelectorAll("#mobileNav a");

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    // run ONLY on mobile screens
    if (window.innerWidth <= 768) {
      mobileNav.classList.remove("open");
    }
  });
});


