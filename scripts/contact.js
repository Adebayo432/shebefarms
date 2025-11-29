// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Get form data function
function getFormData() {
    return {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
}

// Contact Form Handling - WhatsApp
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const formData = getFormData();

    // Create WhatsApp message
    const whatsappMessage = `
*New Contact Form Submission from SHEBE FARMS Website*

*Name:* ${formData.firstName} ${formData.lastName}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Subject:* ${formData.subject}

*Message:*
${formData.message}
    `.trim();

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // WhatsApp number (remove + and spaces)
    const whatsappNumber = '2348135308144';

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');

    // Show success message
    formMessage.style.display = 'block';
    formMessage.className = 'form-message success';
    formMessage.textContent = 'Redirecting to WhatsApp... Please send the message there!';

    // Reset form after a delay
    setTimeout(() => {
        contactForm.reset();
        formMessage.style.display = 'none';
    }, 3000);
});

// Email Button Handler
const emailBtn = document.getElementById('emailBtn');

emailBtn.addEventListener('click', () => {
    // Validate form first
    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    // Get form values
    const formData = getFormData();

    // Create email body
    const emailBody = `
New Contact Form Submission from SHEBE FARMS Website

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}
    `.trim();

    // Create email subject
    const emailSubject = `Contact Form: ${formData.subject} - ${formData.firstName} ${formData.lastName}`;

    // Encode for mailto
    const mailtoLink = `mailto:contact@shebefarms.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    formMessage.style.display = 'block';
    formMessage.className = 'form-message success';
    formMessage.textContent = 'Opening your email client... Please send the message!';

    // Reset form after a delay
    setTimeout(() => {
        contactForm.reset();
        formMessage.style.display = 'none';
    }, 3000);
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close other FAQs
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current FAQ
        item.classList.toggle('active');
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe animated elements
const animatedElements = document.querySelectorAll('.info-card, .faq-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = 'var(--cherry-red)';
        } else {
            this.style.borderColor = 'var(--light-green)';
        }
    });

    input.addEventListener('focus', function () {
        this.style.borderColor = 'var(--cherry-red)';
    });
});

// Email validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', function () {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.value)) {
        this.style.borderColor = 'var(--cherry-red)';
    }
});

// Phone validation
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function () {
    // Remove non-numeric characters
    this.value = this.value.replace(/[^0-9+\s-]/g, '');
});

// Parallax effect for page hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add stagger animation to info cards
const infoCards = document.querySelectorAll('.info-card');
infoCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add stagger animation to FAQ items
faqItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Auto-resize textarea
const messageTextarea = document.getElementById('message');
messageTextarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});