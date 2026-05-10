const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const body = document.body;

const pageTransitionLayer = document.createElement("div");
pageTransitionLayer.className = "page-transition-layer";
document.body.append(pageTransitionLayer);

const menuBackdrop = document.createElement("button");
menuBackdrop.className = "menu-backdrop";
menuBackdrop.type = "button";
menuBackdrop.setAttribute("aria-hidden", "true");
menuBackdrop.addEventListener("click", closeMenu);
document.body.append(menuBackdrop);

function setMenuOpen(isOpen) {
    if (!menuToggle || !navMenu) return;
    menuToggle.classList.toggle("active", isOpen);
    navMenu.classList.toggle("active", isOpen);
    menuBackdrop.classList.toggle("active", isOpen);
    body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeMenu() {
    setMenuOpen(false);
}

function toggleMenu() {
    setMenuOpen(!menuToggle?.classList.contains("active"));
}

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", toggleMenu);

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });
}

window.addEventListener("load", () => {
    requestAnimationFrame(() => {
        pageTransitionLayer.classList.add("page-ready");
    });
});

const activePath = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-menu a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === activePath) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});

document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || link.target === "_blank") return;

    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && !url.search && !url.hash) return;

    link.addEventListener("click", (event) => {
        event.preventDefault();
        pageTransitionLayer.classList.remove("page-ready");
        setTimeout(() => {
            window.location.href = url.href;
        }, 320);
    });
});

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -64px 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("scroll-animate--active");
            }
        });
    }, observerOptions);

    const scrollTargets = document.querySelectorAll(
        ".trust-item, .equipment-item, .value-card, .why-item, .timeline-item, .gallery-item, .info-card, .social-card, .mv-card, .faq-item"
    );

    scrollTargets.forEach((element) => {
        element.classList.add("scroll-animate");
        observer.observe(element);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollAnimations);
} else {
    initScrollAnimations();
}

// Fix navbar scroll positioning on mobile
let lastScrollY = 0;
const navbar = document.querySelector(".navbar");

if (navbar) {
    window.addEventListener("scroll", () => {
        // Only apply on mobile devices (under 900px)
        if (window.innerWidth <= 900) {
            // Always keep navbar fixed at top
            navbar.style.position = "fixed";
            navbar.style.top = "0";
            navbar.style.left = "0";
            navbar.style.right = "0";
            navbar.style.zIndex = "1000";
        }
        lastScrollY = window.scrollY;
    }, { passive: true });

    // Ensure navbar stays fixed on resize
    window.addEventListener("resize", () => {
        if (window.innerWidth <= 900) {
            navbar.style.position = "fixed";
            navbar.style.top = "0";
        }
    });
}
