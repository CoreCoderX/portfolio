/* ============================================
   ROYAL VIOLET PORTFOLIO
   Complete JavaScript - Fixed Version
   ============================================ */

// ============================================
// PARTICLE SYSTEM
// ============================================
class VioletParticles {
  constructor() {
    this.canvas = document.getElementById("particleCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.particleCount = window.innerWidth < 768 ? 50 : 100;
    this.color = "#A78BFA";

    this.init();
    this.animate();
    this.addEventListeners();
  }

  init() {
    this.resizeCanvas();
    this.createParticles();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }
  }

  drawParticles() {
    this.particles.forEach((p) => {
      this.ctx.fillStyle = this.color;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    });
  }

  updateParticles() {
    this.particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y > this.canvas.height) {
        p.y = -10;
        p.x = Math.random() * this.canvas.width;
      }
      if (p.x > this.canvas.width) p.x = 0;
      if (p.x < 0) p.x = this.canvas.width;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawParticles();
    this.updateParticles();
    requestAnimationFrame(() => this.animate());
  }

  addEventListeners() {
    window.addEventListener("resize", () => {
      this.resizeCanvas();
      this.particleCount = window.innerWidth < 768 ? 50 : 100;
      this.createParticles();
    });
  }
}

const particles = new VioletParticles();

// ============================================
// GSAP SETUP
// ============================================
gsap.registerPlugin(ScrollTrigger);

// Refresh ScrollTrigger on load
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

// ============================================
// HERO ANIMATIONS
// ============================================
const heroTL = gsap.timeline({ defaults: { ease: "power3.out" } });

gsap.set(
  ".hero-label, .hero-title .line, .hero-subtitle, .hero-divider, .scroll-indicator",
  {
    opacity: 0,
    y: 30,
  }
);
gsap.set(".hero-divider", { scaleX: 0 });

heroTL
  .to(".hero-label", { opacity: 1, y: 0, duration: 1, delay: 0.3 })
  .to(
    ".hero-title .line",
    { opacity: 1, y: 0, stagger: 0.15, duration: 1 },
    "-=0.5"
  )
  .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
  .to(".hero-divider", { opacity: 1, scaleX: 1, duration: 0.6 }, "-=0.3")
  .to(".scroll-indicator", { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");

// ============================================
// STATEMENT
// ============================================
gsap.from(".statement-quote", {
  scrollTrigger: {
    trigger: ".statement",
    start: "top 80%",
    end: "top 30%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 60,
  duration: 1,
  ease: "power3.out",
});

// ============================================
// SECTION TITLES
// ============================================
gsap.utils.toArray(".section-title").forEach((title) => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power3.out",
  });
});

// ============================================
// ABOUT SECTION
// ============================================
gsap.from(".about-text p", {
  scrollTrigger: {
    trigger: ".about-text",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 40,
  stagger: 0.2,
  duration: 0.8,
  ease: "power3.out",
});

gsap.from(".detail-item", {
  scrollTrigger: {
    trigger: ".about-details",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  x: 40,
  stagger: 0.15,
  duration: 0.8,
  ease: "power3.out",
});

// ============================================
// EXPERTISE SECTION
// ============================================
gsap.utils.toArray(".expertise-category").forEach((category, i) => {
  gsap.from(category, {
    scrollTrigger: {
      trigger: category,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    x: -60,
    duration: 0.8,
    delay: i * 0.1,
    ease: "power3.out",
  });
});

// ============================================
// CLEAN PROGRESS TREE ANIMATIONS (FIXED)
// ============================================

// Animate progress nodes
gsap.utils.toArray(".progress-node").forEach((node, i) => {
  const isOdd = (i + 1) % 2 !== 0; // Check if odd (1st, 3rd, etc.)

  gsap.from(node.querySelector(".node-card"), {
    scrollTrigger: {
      trigger: node,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    x: isOdd ? -80 : 80, // Slide from left for odd, right for even
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(node.querySelector(".node-marker"), {
    scrollTrigger: {
      trigger: node,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    scale: 0,
    duration: 0.6,
    delay: 0.2,
    ease: "back.out(2)",
  });
});

// Animate timeline line (draw from top to bottom)
gsap.from(".tree-timeline", {
  scrollTrigger: {
    trigger: ".progress-tree",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  scaleY: 0,
  transformOrigin: "top center",
  duration: 1.2,
  ease: "power2.out",
});

// Animate title
gsap.from(".progress-tree-title", {
  scrollTrigger: {
    trigger: ".progress-tree-container",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: "power3.out",
});

// Add interactive line highlighting
document.querySelectorAll(".progress-node").forEach((node) => {
  node.addEventListener("mouseenter", () => {
    const timeline = document.querySelector(".tree-timeline");
    timeline.style.background = `linear-gradient(
            to bottom,
            transparent,
            var(--violet-bright) 10%,
            var(--violet-bright) 50%,
            var(--violet-bright) 90%,
            transparent
        )`;
  });

  node.addEventListener("mouseleave", () => {
    const timeline = document.querySelector(".tree-timeline");
    timeline.style.background = `linear-gradient(
            to bottom,
            transparent,
            var(--violet-dark) 10%,
            var(--violet) 50%,
            var(--violet-bright) 90%,
            transparent
        )`;
  });
});

// ============================================
// PROJECTS - FIXED
// ============================================
gsap.utils.toArray(".project-item").forEach((project, i) => {
  gsap.from(project, {
    scrollTrigger: {
      trigger: project,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 80,
    duration: 0.8,
    delay: i * 0.15,
    ease: "power3.out",
  });
});

// ============================================
// ACHIEVEMENTS - FIXED
// ============================================
gsap.utils.toArray(".achievement-item").forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 60,
    scale: 0.95,
    duration: 0.7,
    delay: i * 0.1,
    ease: "power3.out",
  });
});

// ============================================
// CONTACT SECTION
// ============================================
gsap.from(".contact-item", {
  scrollTrigger: {
    trigger: ".contact-info",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 30,
  stagger: 0.1,
  duration: 0.7,
  ease: "power3.out",
});

gsap.from(".contact-cta", {
  scrollTrigger: {
    trigger: ".contact-cta",
    start: "top 85%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 40,
  duration: 0.8,
  ease: "power3.out",
});

// ============================================
// OUTRO
// ============================================
gsap.from(".outro-content > *", {
  scrollTrigger: {
    trigger: ".outro",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 30,
  stagger: 0.15,
  duration: 0.8,
  ease: "power3.out",
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.createElement("div");
cursor.className = "cursor";
document.body.appendChild(cursor);

const cursorStyle = document.createElement("style");
cursorStyle.textContent = `
    .cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--violet);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease, opacity 0.3s, background 0.2s;
        opacity: 0;
        transform: translate(-50%, -50%);
    }
    .cursor.active {
        transform: translate(-50%, -50%) scale(1.5);
        background: rgba(139, 92, 246, 0.2);
    }
    @media (max-width: 768px) {
        .cursor { display: none; }
    }
`;
document.head.appendChild(cursorStyle);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  cursor.style.opacity = "1";
});

document
  .querySelectorAll(
    "a, button, .project-item, .achievement-item, .expertise-tag, .tag, .progress-node"
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });

// ============================================
// CONSOLE SIGNATURE
// ============================================
console.log(
  "%c Designed by Siva Prakash ",
  "background: linear-gradient(135deg, #8B5CF6, #A78BFA); color: #FFF; font-size: 16px; padding: 10px 20px; font-weight: bold; border-radius: 4px;"
);
console.log(
  "%c Cinematic. Premium. Unforgettable. ",
  "color: #A78BFA; font-size: 14px; font-style: italic; padding: 8px 0;"
);
