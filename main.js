/* ============================================================
   STUDIO DEDUNU — main.js
   Navigation, animations, portfolio filter, lightbox,
   testimonial slider, forms, and scroll effects.
   ============================================================ */

"use strict";

/* ============ 1. PRELOADER ============ */
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => preloader.classList.add("hidden"), 500);
});

/* ============ 2. STICKY NAVBAR + SCROLL PROGRESS + BACK TO TOP ============ */
const navbar = document.getElementById("navbar");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    navbar.classList.toggle("scrolled", scrollY > 40);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = docHeight > 0 ? (scrollY / docHeight) * 100 + "%" : "0";

    backToTop.classList.toggle("show", scrollY > 500);
}, { passive: true });

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ============ 3. MOBILE HAMBURGER MENU ============ */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("open");
    document.body.style.overflow = navMenu.classList.contains("open") ? "hidden" : "";
});

// Close the mobile menu when a link is clicked
navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("open");
        document.body.style.overflow = "";
    });
});

/* ============ 4. ACTIVE NAV LINK ON SCROLL (scroll-spy) ============ */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "home";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 140) current = section.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
}, { passive: true });

/* ============ 5. SCROLL REVEAL ANIMATIONS ============ */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ============ 6. ANIMATED COUNTERS (hero stats) ============ */
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        const duration = 1800;
        const start = performance.now();

        const tick = now => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased);
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.6 });

document.querySelectorAll(".stat-num").forEach(el => counterObserver.observe(el));

/* ============ 7. HERO TYPEWRITER ============ */
(function typewriter() {
    const el = document.getElementById("typewriter");
    if (!el) return;
    const words = ["DESIGNS.", "BRANDS.", "WEBSITES.", "EXPERIENCES."];
    let wi = 0, ci = words[0].length, deleting = true;

    function step() {
        const word = words[wi];
        if (deleting) {
            ci--;
            if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
        } else {
            ci++;
            if (ci === words[wi].length) {
                deleting = true;
                el.textContent = words[wi];
                return setTimeout(step, 2200);
            }
        }
        el.textContent = words[wi].slice(0, ci);
        setTimeout(step, deleting ? 55 : 110);
    }
    setTimeout(step, 2200);
})();

/* ============ 8. PORTFOLIO DATA + RENDER ============ */
const portfolioItems = [
    { cat: "logo",       label: "Logo Design",          title: "Aurora Coffee Roasters", desc: "Modern minimalist logo for a specialty coffee brand.", seed: "logo-aurora" },
    { cat: "web",        label: "Web Design",           title: "NovaTech Solutions",     desc: "Corporate website with bold gradients and smooth motion.", seed: "web-novatech" },
    { cat: "banner",     label: "Banner Design",        title: "Summer Sale Campaign",   desc: "High-impact promotional web banner design.", seed: "banner-summer" },
    { cat: "branding",   label: "Branding",             title: "Lush Skincare Identity", desc: "Full brand identity — logo, palette, and packaging.", seed: "brand-lush" },
    { cat: "poster",     label: "Poster Design",        title: "Music Fest 2026",        desc: "Vibrant event poster with dynamic typography.", seed: "poster-musicfest" },
    { cat: "social",     label: "Social Media Design",  title: "FitLife Instagram Kit",  desc: "30-piece social media template pack for a gym brand.", seed: "social-fitlife" },
    { cat: "logo",       label: "Logo Design",          title: "Peak Adventures",        desc: "Outdoor adventure brand mark with custom lettering.", seed: "logo-peak" },
    { cat: "web",        label: "Web Design",           title: "Bloom Boutique Store",   desc: "E-commerce experience with elegant product showcases.", seed: "web-bloom" },
    { cat: "banner",     label: "Banner Design",        title: "Tech Expo Billboard",    desc: "Large-format billboard and event banner design.", seed: "banner-techexpo" },
    { cat: "poster",     label: "Poster Design",        title: "Indie Film Premiere",    desc: "Cinematic poster with moody color grading.", seed: "poster-indiefilm" },
    { cat: "social",     label: "Social Media Design",  title: "Ceylon Eats Campaign",   desc: "Food promotion graphics that boosted engagement 2x.", seed: "social-ceyloneats" },
    { cat: "branding",   label: "Branding",             title: "Vertex Consulting",      desc: "Professional rebrand with stationery and guidelines.", seed: "brand-vertex" },
];

const portfolioGrid = document.getElementById("portfolioGrid");

portfolioGrid.innerHTML = portfolioItems.map((item, i) => `
    <div class="portfolio-item" data-cat="${item.cat}" data-index="${i}" role="button" tabindex="0" aria-label="View ${item.title}">
        <img src="https://picsum.photos/seed/${item.seed}/640/520" alt="${item.title} — ${item.label}" loading="lazy">
        <div class="portfolio-overlay">
            <span class="p-cat">${item.label}</span>
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
        </div>
        <span class="portfolio-zoom"><i class="fa-solid fa-magnifying-glass-plus"></i></span>
    </div>
`).join("");

/* ============ 9. PORTFOLIO CATEGORY FILTERING ============ */
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioEls = document.querySelectorAll(".portfolio-item");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;

        portfolioEls.forEach(item => {
            const match = filter === "all" || item.dataset.cat === filter;
            if (match) {
                item.classList.remove("hide");
                item.style.animation = "none";
                void item.offsetWidth;           // restart fade-in animation
                item.style.animation = "";
            } else {
                item.classList.add("hide");
            }
        });
    });
});

/* ============ 10. LIGHTBOX ============ */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDesc = document.getElementById("lightboxDesc");
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
}

function updateLightbox() {
    const item = portfolioItems[currentIndex];
    lightboxImg.src = `https://picsum.photos/seed/${item.seed}/1100/760`;
    lightboxImg.alt = `${item.title} — ${item.label}`;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = `${item.label} — ${item.desc}`;
}

function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
}

function stepLightbox(dir) {
    currentIndex = (currentIndex + dir + portfolioItems.length) % portfolioItems.length;
    updateLightbox();
}

portfolioGrid.addEventListener("click", e => {
    const item = e.target.closest(".portfolio-item");
    if (item) openLightbox(+item.dataset.index);
});

portfolioGrid.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        const item = e.target.closest(".portfolio-item");
        if (item) openLightbox(+item.dataset.index);
    }
});

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("lightboxPrev").addEventListener("click", () => stepLightbox(-1));
document.getElementById("lightboxNext").addEventListener("click", () => stepLightbox(1));

lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
});

/* ============ 11. PROCESS TIMELINE PROGRESS ============ */
const timeline = document.querySelector(".timeline");
const timelineProgress = document.getElementById("timelineProgress");

if (timeline) {
    const timelineObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
    }, { threshold: 0.5 });

    document.querySelectorAll(".timeline-item").forEach(el => timelineObserver.observe(el));

    window.addEventListener("scroll", () => {
        const rect = timeline.getBoundingClientRect();
        const visible = Math.min(Math.max(window.innerHeight * 0.6 - rect.top, 0), rect.height);
        timelineProgress.style.height = (visible / rect.height) * 100 + "%";
    }, { passive: true });
}

/* ============ 12. TESTIMONIAL SLIDER ============ */
(function testimonialSlider() {
    const track = document.getElementById("testiTrack");
    if (!track) return;
    const cards = track.children.length;
    const dotsWrap = document.getElementById("testiDots");
    let index = 0, autoPlay;

    for (let i = 0; i < cards; i++) {
        const dot = document.createElement("button");
        dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
        dot.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(dot);
    }
    const dots = dotsWrap.children;

    function goTo(i) {
        index = (i + cards) % cards;
        track.style.transform = `translateX(-${index * 100}%)`;
        [...dots].forEach((d, di) => d.classList.toggle("active", di === index));
        restartAuto();
    }

    function restartAuto() {
        clearInterval(autoPlay);
        autoPlay = setInterval(() => goTo(index + 1), 5000);
    }

    document.getElementById("testiPrev").addEventListener("click", () => goTo(index - 1));
    document.getElementById("testiNext").addEventListener("click", () => goTo(index + 1));

    track.parentElement.addEventListener("mouseenter", () => clearInterval(autoPlay));
    track.parentElement.addEventListener("mouseleave", restartAuto);

    goTo(0);
})();

/* ============ 13. CONTACT FORM (front-end validation + feedback) ============ */
(function contactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    const status = document.getElementById("formStatus");
    const submitBtn = document.getElementById("submitBtn");

    form.addEventListener("submit", e => {
        e.preventDefault();
        status.className = "form-status";

        let valid = true;
        form.querySelectorAll("[required]").forEach(field => {
            const ok = field.value.trim() !== "" &&
                (field.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));
            field.classList.toggle("error", !ok);
            if (!ok) valid = false;
        });

        if (!valid) {
            status.textContent = "Please fill in all fields correctly.";
            status.classList.add("error");
            return;
        }

        // Front-end demo only — connect to a Spring Boot endpoint here, e.g.:
        // fetch("/api/contact", { method: "POST", body: new FormData(form) })
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-circle-notch fa-spin"></i>';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
            status.textContent = "Thank you! Your message has been sent. We'll reply within 24 hours.";
            status.classList.add("success");
            form.reset();
        }, 1400);
    });

    form.querySelectorAll("[required]").forEach(field => {
        field.addEventListener("input", () => field.classList.remove("error"));
    });
})();

/* ============ 14. NEWSLETTER FORM ============ */
(function newsletter() {
    const form = document.getElementById("newsletterForm");
    if (!form) return;
    form.addEventListener("submit", e => {
        e.preventDefault();
        const input = form.querySelector("input");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            input.style.color = "#ff8a9b";
            setTimeout(() => input.style.color = "", 1200);
            return;
        }
        input.value = "";
        input.placeholder = "Subscribed! Thank you.";
        setTimeout(() => input.placeholder = "Your email address", 3000);
    });
})();

/* ============ 15. FOOTER YEAR ============ */
document.getElementById("year").textContent = new Date().getFullYear();
