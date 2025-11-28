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
const animatedElements = document.querySelectorAll('.additional-card, .process-step, .pricing-feature');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Service blocks animation
const serviceBlocks = document.querySelectorAll('.service-block');
serviceBlocks.forEach((block, index) => {
    const content = block.querySelector('.service-content');
    const image = block.querySelector('.service-image');

    const blockObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                content.style.opacity = '1';
                content.style.transform = 'translateX(0)';
                image.style.opacity = '1';
                image.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });

    content.style.opacity = '0';
    image.style.opacity = '0';
    content.style.transition = 'all 0.8s ease';
    image.style.transition = 'all 0.8s ease 0.2s';

    if (block.classList.contains('reverse')) {
        content.style.transform = 'translateX(100px)';
        image.style.transform = 'translateX(-100px)';
    } else {
        content.style.transform = 'translateX(-100px)';
        image.style.transform = 'translateX(100px)';
    }

    blockObserver.observe(block);
});

// Smooth scroll for anchor links and service links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add stagger effect to additional cards
const additionalCards = document.querySelectorAll('.additional-card');
additionalCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add stagger effect to process steps
const processSteps = document.querySelectorAll('.process-step');
processSteps.forEach((step, index) => {
    step.style.animationDelay = `${index * 0.15}s`;
});

// Parallax effect for page hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Service features hover effect
const featureItems = document.querySelectorAll('.service-features li');
featureItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.paddingLeft = '2.5rem';
        this.style.color = 'var(--cherry-red)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.paddingLeft = '2rem';
        this.style.color = 'var(--text-dark)';
    });
});