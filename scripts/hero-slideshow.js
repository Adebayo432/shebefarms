// ============================================================
// SHEBE FARMS - Universal Hero Slideshow
// All images from all page hero sections shared across every page
// ============================================================

const heroSlides = [
    { src: 'images/wide-lp (4).jpg', alt: 'SHEBE FARMS aerial landscape view' },
    // { src: 'images/farmer-ap.jpg', alt: 'SHEBE FARMS farmer in the field' },
    { src: 'images/landcape-image.jpg', alt: 'SHEBE FARMS landscape' },
    { src: 'images/tractor-image.jpg', alt: 'Agricultural tractor at SHEBE FARMS' },
    { src: 'images/tractor.jpg', alt: 'Field cultivator at SHEBE FARMS' },
    // { src: 'images/sprayer.jpg', alt: 'Precision crop sprayer at SHEBE FARMS' },
    // { src: 'images/bedformer.jpg', alt: 'Mechanical seed planter at SHEBE FARMS' },
    // { src: 'images/farm-instructor-image.jpg', alt: 'Farm team at SHEBE FARMS' },
    // { src: 'images/tomatooo.jpeg', alt: 'Fresh tomato harvest at SHEBE FARMS' },
    { src: 'images/IMG-20251204-WA0019.jpg', alt: 'Farm landscape overview' },
];

let currentSlide = 0;
let slideInterval = null;
let isInitialized = false;

function initHeroSlideshow() {
    if (isInitialized) return;
    const heroOverlay = document.querySelector('.hero-overlay');
    if (!heroOverlay) return;
    isInitialized = true;

    const slideshowEl = document.createElement('div');
    slideshowEl.className = 'hero-slideshow';
    slideshowEl.setAttribute('aria-label', 'SHEBE FARMS photo slideshow');
    slideshowEl.innerHTML = heroSlides.map((slide, i) => `
        <div class="hero-slide${i === 0 ? ' active' : ''}" data-index="${i}">
            <img src="${slide.src}" alt="${slide.alt}" class="hero-slide-img" loading="${i === 0 ? 'eager' : 'lazy'}">
        </div>
    `).join('');

    const existingImg = heroOverlay.querySelector('img');
    if (existingImg) existingImg.remove();
    heroOverlay.appendChild(slideshowEl);

    const nav = document.createElement('div');
    nav.className = 'hero-slideshow-nav';
    nav.innerHTML = `
        <button class="hero-slide-prev" aria-label="Previous slide" type="button">
            <i class="fas fa-chevron-left"></i>
        </button>
        <div class="hero-slide-dots"></div>
        <button class="hero-slide-next" aria-label="Next slide" type="button">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    heroOverlay.appendChild(nav);

    const dotsWrap = nav.querySelector('.hero-slide-dots');
    heroSlides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `hero-slide-dot${i === 0 ? ' active' : ''}`;
        dot.setAttribute('type', 'button');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsWrap.appendChild(dot);
    });

    nav.querySelector('.hero-slide-prev').addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
    nav.querySelector('.hero-slide-next').addEventListener('click', () => { nextSlide(); resetAutoPlay(); });

    let touchStartX = 0;
    heroOverlay.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    heroOverlay.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); resetAutoPlay(); }
    }, { passive: true });

    heroOverlay.addEventListener('mouseenter', pauseAutoPlay);
    heroOverlay.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();
}

function showSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-slide-dot');
    if (!slides.length) return;
    currentSlide = ((index % slides.length) + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }
function goToSlide(i) { showSlide(i); resetAutoPlay(); }

function startAutoPlay() {
    if (slideInterval) return;
    slideInterval = setInterval(nextSlide, 5000);
}
function pauseAutoPlay() { clearInterval(slideInterval); slideInterval = null; }
function resetAutoPlay() { pauseAutoPlay(); startAutoPlay(); }

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroSlideshow);
} else {
    initHeroSlideshow();
}