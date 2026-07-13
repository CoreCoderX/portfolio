// =========================================
// 1. DATA & CONFIGURATION
// =========================================

const ROLES = [
  "APPLICATION DEVELOPER",
  "FULL STACK DEVELOPER",
  "FLUTTER DEVELOPER",
  "AI ENGINEER",
  "BACKEND ENGINEER",
  "SOFTWARE ENGINEER",
];

const SKILLS_DATA = {
  programming: [
    { name: "Java", icon: "picon:java", level: 90 },
    { name: "Kotlin", icon: "simple-icons:kotlin", level: 75 },
    { name: "Dart", icon: "simple-icons:dart", level: 85 },
    { name: "Python", icon: "simple-icons:python", level: 80 },
    { name: "JavaScript", icon: "simple-icons:javascript", level: 90 },
    { name: "TypeScript", icon: "simple-icons:typescript", level: 85 },
    { name: "SQL", icon: "mdi:database", level: 80 },
    { name: "C", icon: "mdi:language-c", level: 70 },
    { name: "C++", icon: "mdi:language-cpp", level: 70 },
  ],
  frontend: [
    { name: "HTML5", icon: "simple-icons:html5", level: 95 },
    { name: "CSS3", icon: "simple-icons:css3", level: 90 },
    { name: "Tailwind", icon: "simple-icons:tailwindcss", level: 90 },
    { name: "React", icon: "simple-icons:react", level: 85 },
    { name: "Next.js", icon: "simple-icons:nextjs", level: 75 },
    { name: "Vite", icon: "simple-icons:vite", level: 80 },
    { name: "Framer Motion", icon: "mdi:animation", level: 70 },
    { name: "Responsive Design", icon: "mdi:cellphone-settings", level: 95 },
  ],
  backend: [
    { name: "Spring Boot", icon: "simple-icons:spring", level: 85 },
    { name: "FastAPI", icon: "simple-icons:fastapi", level: 80 },
    { name: "Node.js", icon: "simple-icons:nodedotjs", level: 85 },
    { name: "Express", icon: "simple-icons:express", level: 85 },
    { name: "REST API", icon: "mdi:api", level: 90 },
    { name: "JWT/OAuth", icon: "mdi:security", level: 85 },
    { name: "Microservices", icon: "mdi:cube-outline", level: 70 },
  ],
  mobile: [
    { name: "Flutter", icon: "simple-icons:flutter", level: 90 },
    { name: "Android Studio", icon: "simple-icons:androidstudio", level: 85 },
    { name: "BLE", icon: "mdi:bluetooth", level: 80 },
    { name: "Location Services", icon: "mdi:map-marker-radius", level: 85 },
    { name: "Offline First", icon: "mdi:wifi-off", level: 75 },
    { name: "State Mgmt", icon: "mdi:state-machine", level: 85 },
  ],
  database: [
    { name: "PostgreSQL", icon: "simple-icons:postgresql", level: 85 },
    { name: "MongoDB", icon: "simple-icons:mongodb", level: 80 },
    { name: "Redis", icon: "simple-icons:redis", level: 70 },
    { name: "JPA/Hibernate", icon: "mdi:database-sync", level: 80 },
    { name: "SQLAlchemy", icon: "mdi:database-edit", level: 75 },
  ],
  ai: [
    { name: "Prompt Eng.", icon: "mdi:message-text", level: 85 },
    { name: "LLM APIs", icon: "mdi:robot", level: 80 },
    { name: "OpenRouter", icon: "mdi:router", level: 75 },
    { name: "Hugging Face", icon: "simple-icons:huggingface", level: 70 },
    { name: "Agent Systems", icon: "mdi:brain", level: 75 },
    { name: "GenAI", icon: "mdi:sparkles", level: 80 },
  ],
  cloud: [
    { name: "Git", icon: "simple-icons:git", level: 90 },
    { name: "GitHub", icon: "simple-icons:github", level: 95 },
    { name: "Docker", icon: "simple-icons:docker", level: 70 },
    { name: "Firebase", icon: "simple-icons:firebase", level: 80 },
    { name: "Linux", icon: "simple-icons:linux", level: 75 },
    { name: "Figma", icon: "simple-icons:figma", level: 80 },
  ],
  other: [
    { name: "IoT", icon: "mdi:chip", level: 70 },
    { name: "REST APIs", icon: "mdi:web", level: 90 },
    { name: "JWT/TOTP", icon: "mdi:two-factor-authentication", level: 85 },
    { name: "UI/UX", icon: "mdi:palette", level: 80 },
    { name: "Agile", icon: "mdi:sync", level: 85 },
    { name: "Optimization", icon: "mdi:speedometer", level: 80 },
  ],
};

// =========================================
// 2. BOOT SEQUENCE
// =========================================

const bootLines = [
  "> INITIALIZING...",
  "> LOADING MODULES: [FRONTEND] [BACKEND] [DB] [Cloud]",
  "> CONNECTING TO SIVAPRAKASH.MAINFRAME...",
  "> ESTABLISHING SECURE HANDSHAKE...",
  "> ACCESS GRANTED ✓",
];

function initBootSequence() {
  const bootScreen = document.getElementById("boot-screen");
  const linesContainer = document.getElementById("boot-lines");
  const progressBar = document.getElementById("boot-progress-bar");
  const skipBtn = document.getElementById("boot-skip");

  if (!bootScreen) return;

  let currentLine = 0;
  let progress = 0;

  // Skip functionality
  skipBtn.addEventListener("click", finishBoot);

  function typeLines() {
    if (currentLine < bootLines.length) {
      const lineEl = document.createElement("div");
      lineEl.className = "boot-line";
      lineEl.textContent = bootLines[currentLine];

      // Color the "OK" or checkmarks
      if (bootLines[currentLine].includes("✓")) {
        lineEl.innerHTML = bootLines[currentLine].replace(
          "✓",
          '<span class="ok">✓</span>',
        );
      }

      linesContainer.appendChild(lineEl);

      setTimeout(() => lineEl.classList.add("visible"), 50);

      currentLine++;
      setTimeout(typeLines, 400);
    } else {
      startProgress();
    }
  }

  function startProgress() {
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(finishBoot, 300);
      }
      progressBar.style.width = `${progress}%`;
    }, 100);
  }

  function finishBoot() {
    gsap.to(bootScreen, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        bootScreen.style.display = "none";
        initMainAnimations();
      },
    });
  }

  // Start
  setTimeout(typeLines, 500);
}

// =========================================
// 3. CUSTOM CURSOR
// =========================================

function initCursor() {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");

  if (!dot || !ring) return;

  // Only enable on desktop
  if (window.innerWidth < 1025) return;

  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Smooth follow for ring
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effects
  const hoverTargets = document.querySelectorAll(
    "a, button, .skill-card, .project-card, .stamp, .interest-tag, .tech-badge, .hackathon-card, .award-frame, .contact-btn",
  );

  hoverTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => ring.classList.add("hover"));
    target.addEventListener("mouseleave", () => ring.classList.remove("hover"));
  });
}

// =========================================
// 4. NAVIGATION & UTILS
// =========================================

function initNavigation() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");
  const links = document.querySelectorAll(".mobile-link, .nav-link");
  const clockEl = document.getElementById("nav-clock");
  const progressBar = document.getElementById("scroll-progress");
  const backToTop = document.getElementById("back-to-top");

  // Mobile Menu Toggle
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      menu.classList.toggle("active");
      document.body.style.overflow = menu.classList.contains("active")
        ? "hidden"
        : "";
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        toggle.classList.remove("active");
        menu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // Live Clock
  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    if (clockEl) clockEl.textContent = `${h}:${m}:${s}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Scroll Progress
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (progressBar) progressBar.style.width = `${scrollPercent}%`;
  });

  // Keyboard Shortcuts (Alt + Number)
  document.addEventListener("keydown", (e) => {
    if (e.altKey) {
      const sectionMap = {
        1: "#about",
        2: "#skills",
        3: "#timeline",
        4: "#projects",
        5: "#experience",
        6: "#contact",
      };
      if (sectionMap[e.key]) {
        e.preventDefault();
        document
          .querySelector(sectionMap[e.key])
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  // Back to Top
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// =========================================
// 5. HERO INTERACTIONS
// =========================================

function initHero() {
  const roleEl = document.getElementById("role-current");
  if (!roleEl) return;

  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % ROLES.length;

    gsap.to(roleEl, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        roleEl.textContent = ROLES[currentIndex];
        gsap.fromTo(
          roleEl,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3 },
        );
      },
    });
  }, 2500);
}

// =========================================
// 6. SKILLS LOGIC
// =========================================

function initSkills() {
  const tabs = document.querySelectorAll(".skill-tab");
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  function renderSkills(category) {
    const skills = SKILLS_DATA[category] || [];
    grid.innerHTML = "";

    skills.forEach((skill, index) => {
      const card = document.createElement("div");
      card.className = "skill-card";
      card.style.opacity = "0"; // For GSAP

      // Determine level text
      let levelText = "BEGINNER";
      if (skill.level > 85) levelText = "EXPERT";
      else if (skill.level > 70) levelText = "ADVANCED";
      else if (skill.level > 50) levelText = "INTERMEDIATE";

      card.innerHTML = `
                <div class="skill-icon">
                    <span class="iconify" data-icon="${skill.icon}" data-width="28"></span>
                </div>
                <div class="skill-name">${skill.name}</div>
                <div class="skill-bar-container">
                    <div class="skill-bar-fill" data-level="${skill.level}"></div>
                </div>
                <div class="skill-level">${levelText}</div>
            `;

      grid.appendChild(card);
    });

    // Re-initialize Iconify for new icons
    if (window.Iconify) window.Iconify.scan();

    // Animate In
    gsap.to(".skill-card", {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "back.out(1.7)",
      onStart: () => {
        // Animate bars
        document.querySelectorAll(".skill-bar-fill").forEach((bar) => {
          const level = bar.getAttribute("data-level");
          gsap.to(bar, {
            width: `${level}%`,
            duration: 1,
            delay: 0.2,
            ease: "power2.out",
          });
        });
      },
    });
  }

  // Tab Click Handlers
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderSkills(tab.getAttribute("data-category"));
    });
  });

  // Initial Render
  renderSkills("programming");
}

// =========================================
// 7. GSAP SCROLL ANIMATIONS
// =========================================

function initMainAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Hero Entrance
  const heroTl = gsap.timeline();
  heroTl
    .from(".hero-badge", { y: 50, opacity: 0, duration: 0.6 })
    .from(
      ".hero-name-stroke",
      { y: 100, opacity: 0, duration: 0.8, stagger: 0.2 },
      "-=0.3",
    )
    .from(".role-container", { y: 30, opacity: 0, duration: 0.5 }, "-=0.4")
    .from(
      ".tagline-box",
      { x: -50, opacity: 0, rotation: -5, duration: 0.6 },
      "-=0.3",
    )
    .from(
      ".hero-ctas .btn",
      { y: 30, opacity: 0, duration: 0.4, stagger: 0.1 },
      "-=0.3",
    )
    .from(
      ".chaos-zone > *",
      {
        scale: 0,
        opacity: 0,
        rotation: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(2)",
      },
      "-=0.5",
    );

  // Generic Section Headers
  gsap.utils.toArray(".section-header").forEach((header) => {
    gsap.from(header.children, {
      scrollTrigger: { trigger: header, start: "top 80%" },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });
  });

  // About Section
  gsap.from(".dossier-photo", {
    scrollTrigger: { trigger: ".about-dossier", start: "top 70%" },
    scale: 0.8,
    opacity: 0,
    rotation: 10,
    duration: 0.8,
    ease: "back.out(1.7)",
  });

  // gsap.from(".stamp", {
  //   scrollTrigger: { trigger: ".personality-stamps", start: "top 80%" },
  //   scale: 0,
  //   opacity: 0,
  //   rotation: -20,
  //   duration: 0.5,
  //   stagger: 0.05,
  //   ease: "back.out(2)",
  // });

  // Education Gauge
  gsap.to(".cgpa-fill", {
    scrollTrigger: { trigger: ".edu-cgpa", start: "top 80%" },
    width: "81.2%", // 8.12/10
    duration: 1.5,
    ease: "power2.out",
  });

  // Timeline
  gsap.utils.toArray(".timeline-item").forEach((item, i) => {
    gsap.from(item.querySelector(".timeline-card"), {
      scrollTrigger: { trigger: item, start: "top 75%" },
      x: item.classList.contains("timeline-left") ? -100 : 100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  // Timeline Vehicle Movement
  const wrapper = document.querySelector(".timeline-wrapper");
  const road = document.querySelector(".timeline-road");
  const rocket = document.querySelector(".timeline-vehicle");

  if (wrapper && road && rocket) {
    gsap.to(rocket, {
      y: () => {
        return road.offsetHeight - rocket.offsetHeight;
      },

      ease: "none",

      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }

  // Projects
  gsap.utils.toArray(".project-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: "top 85%" },
      y: 80,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.1,
      ease: "power3.out",
    });
  });

  // Awards
  gsap.utils.toArray(".award-frame").forEach((frame, i) => {
    gsap.from(frame, {
      scrollTrigger: { trigger: frame, start: "top 85%" },
      y: 50,
      opacity: 0,
      rotation: -10,
      duration: 0.6,
      delay: i * 0.05,
      ease: "back.out(1.5)",
    });
  });

  // Contact Terminal
  gsap.from(".contact-terminal", {
    scrollTrigger: { trigger: ".contact-section", start: "top 70%" },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });
}

// =========================================
// 8. TOGGLES (THEME & CHAOS)
// =========================================

function initToggles() {
  const themeToggle = document.getElementById("theme-toggle");
  const chaosToggle = document.getElementById("chaos-toggle");

  // Theme
  if (themeToggle) {
    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") document.body.classList.add("dark-mode");

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // Chaos
  if (chaosToggle) {
    chaosToggle.addEventListener("click", () => {
      document.body.classList.toggle("chaos-mode");
      chaosToggle.classList.toggle("active");
    });
  }
}

// =========================================
// 9. INITIALIZATION
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  initBootSequence();
  initCursor();
  initNavigation();
  initHero();
  initSkills();
  initToggles();
});
