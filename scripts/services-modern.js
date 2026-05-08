document.querySelectorAll(".service-block").forEach((block) => {
    block.querySelectorAll(".service-content h2").forEach((heading, index) => {
        heading.id = heading.id || `service-${index + 1}`;
    });
});
