const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const emailBtn = document.getElementById("emailBtn");

function getFormData() {
    return {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim()
    };
}

function showMessage(text) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.style.display = "block";
    setTimeout(() => {
        formMessage.style.display = "none";
    }, 3000);
}

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = getFormData();
        const message = encodeURIComponent(
            `New contact from website\nName: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\nSubject: ${data.subject}\n\n${data.message}`
        );
        window.open(`https://wa.me/2348135308144?text=${message}`, "_blank");
        showMessage("Redirecting to WhatsApp...");
    });
}

if (emailBtn && contactForm) {
    emailBtn.addEventListener("click", () => {
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }
        const data = getFormData();
        const subject = encodeURIComponent(`Contact Form: ${data.subject}`);
        const body = encodeURIComponent(
            `Name: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\n\n${data.message}`
        );
        window.location.href = `mailto:contact@shebefarms.com?subject=${subject}&body=${body}`;
        showMessage("Opening your email client...");
    });
}

document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
        const wrapper = button.closest(".faq-item");
        if (!wrapper) return;

        const isActive = wrapper.classList.contains("active");
        const answer = wrapper.querySelector(".faq-answer");

        if (isActive) {
            // Closing animation
            answer.style.maxHeight = answer.scrollHeight + "px";
            setTimeout(() => {
                answer.style.maxHeight = "0";
            }, 10);
            setTimeout(() => {
                wrapper.classList.remove("active");
                button.setAttribute("aria-expanded", "false");
            }, 400);
        } else {
            // Opening animation
            wrapper.classList.add("active");
            button.setAttribute("aria-expanded", "true");
            answer.style.maxHeight = answer.scrollHeight + "px";
            setTimeout(() => {
                answer.style.maxHeight = "none";
            }, 400);
        }
    });
});
