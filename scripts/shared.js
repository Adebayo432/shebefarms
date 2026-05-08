const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.classList.toggle("active");
        navMenu.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

const activePath = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-menu a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === activePath) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});
