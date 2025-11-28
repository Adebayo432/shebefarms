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

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        newsletter: document.getElementById('newsletter').checked
    };

    // Show loading state
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';

        // Show success message
        formMessage.style.display = 'block';
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you for contacting us! We will get back to you within 24 hours.';

        // Reset form
        contactForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);

        // Log form data (for testing - remove in production)
        console.log('Form submitted:', formData);
    }, 2000);
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