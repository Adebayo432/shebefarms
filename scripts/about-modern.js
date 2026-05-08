document.querySelectorAll(".timeline-item").forEach((item, index) => {
    item.style.animationDelay = `${index * 80}ms`;
});
