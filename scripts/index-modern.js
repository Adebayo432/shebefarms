document.querySelectorAll(".feature-list li").forEach((item) => {
    const icon = item.querySelector("i");
    if (icon) {
        icon.setAttribute("aria-hidden", "true");
    }
});
