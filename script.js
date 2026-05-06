// =========================================
//  Mobile menu toggle
// =========================================
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// =========================================
//  Typing effect for hero subtitle
// =========================================
(function typedRoles() {
  const target = document.getElementById("typed");
  if (!target) return;

  const phrases = [
    "Software Engineer",
    "Machine Learning Researcher",
    "Multi-Agent AI Builder",
    "C++ & Python Developer",
    "Data Science Explorer",
  ];

  let pIndex = 0;
  let cIndex = 0;
  let deleting = false;

  function tick() {
    const current = phrases[pIndex];
    if (!deleting) {
      target.textContent = current.slice(0, ++cIndex);
      if (cIndex === current.length) {
        deleting = true;
        return setTimeout(tick, 1600);
      }
    } else {
      target.textContent = current.slice(0, --cIndex);
      if (cIndex === 0) {
        deleting = false;
        pIndex = (pIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 75);
  }
  tick();
})();

// =========================================
//  Scroll reveal (IntersectionObserver)
// =========================================
(function reveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  els.forEach((el) => io.observe(el));
})();

// =========================================
//  Project card spotlight (mouse follow glow)
// =========================================
(function projectSpotlight() {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });
})();

// =========================================
//  GPA ring fills (animated)
// =========================================
(function gpaRings() {
  const rings = document.querySelectorAll(".gpa-ring");
  if (!rings.length) return;

  const animate = (ring) => {
    const gpa = parseFloat(ring.dataset.gpa || "0");
    const target = Math.max(0, Math.min(100, (gpa / 4) * 100));
    let current = 0;
    const step = target / 40;
    const tick = () => {
      current = Math.min(target, current + step);
      ring.style.setProperty("--p", current.toFixed(2));
      if (current < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    rings.forEach(animate);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  rings.forEach((r) => io.observe(r));
})();

// =========================================
//  Footer year
// =========================================
(function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();
