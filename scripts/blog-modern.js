document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
        item.style.transform = "translateY(-2px)";
    });
    item.addEventListener("mouseleave", () => {
        item.style.transform = "translateY(0)";
    });
});
