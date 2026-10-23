const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

const floatingThemeToggle = document.querySelector(".floating-theme-toggle") || (() => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "floating-theme-toggle";
    button.setAttribute("aria-label", "Switch to dark mode");
    button.innerHTML = "☾";
    document.body.appendChild(button);
    return button;
})();

const savedTheme = localStorage.getItem("shebefarms-theme") || "light";
body.setAttribute("data-theme", savedTheme);

function setTheme(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    body.setAttribute("data-theme", nextTheme);
    localStorage.setItem("shebefarms-theme", nextTheme);

    const icon = nextTheme === "dark" ? "☀" : "☾";

    if (themeToggle) {
        themeToggle.setAttribute("aria-label", nextTheme === "dark" ? "Switch to light mode" : "Switch to dark mode");
        themeToggle.innerHTML = icon;
    }

    if (floatingThemeToggle) {
        floatingThemeToggle.setAttribute("aria-label", nextTheme === "dark" ? "Switch to light mode" : "Switch to dark mode");
        floatingThemeToggle.innerHTML = icon;
    }
}

const themeSwitchHandlers = [themeToggle, floatingThemeToggle].filter(Boolean);

themeSwitchHandlers.forEach((button) => {
    button.addEventListener("click", () => {
        const activeTheme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
        setTheme(activeTheme);
    });
});

setTheme(savedTheme);

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

