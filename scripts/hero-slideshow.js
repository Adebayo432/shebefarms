// ============================================================
// SHEBE FARMS - Universal Hero Slideshow
// Uses hero images from every page as a cross-page slideshow
// ============================================================

const heroSlides = [
    { src: 'images/wide-lp (4).jpg', alt: 'SHEBE FARMS aerial landscape view' },
    { src: 'images/farmer-ap.jpg', alt: 'SHEBE FARMS farmer in the field' },
    { src: 'images/landcape-image.jpg', alt: 'SHEBE FARMS landscape' },
];

let currentSlide = 0;
let slideInterval = null;
let isInitialized = false;

function buildHeroSrcSet(src) {
    // Repo ships one main hero image per slide; still provide responsive srcset
    // so the markup works with future multi-size replacements.
    const encoded = encodeURI(src);
    return `${encoded} 640w, ${encoded} 1280w, ${encoded} 1920w`;
}

function ensureImageLoaded(imgEl) {
    if (!imgEl) return;
    if (imgEl.getAttribute('data-loaded') === 'true') return;

    const dataSrc = imgEl.getAttribute('data-src');
    if (!dataSrc) return;

    // Make sure the newly-active slide isn't delayed by native lazy loading.
    imgEl.loading = 'eager';
    imgEl.src = dataSrc;
    const dataSrcSet = imgEl.getAttribute('data-srcset');
    if (dataSrcSet) imgEl.srcset = dataSrcSet;

    const dataSizes = imgEl.getAttribute('data-sizes');
    if (dataSizes) imgEl.sizes = dataSizes;

    imgEl.setAttribute('data-loaded', 'true');
}

function initHeroSlideshow() {
    if (isInitialized) return;
    const heroOverlay = document.querySelector('.hero-overlay');
    if (!heroOverlay) return;
    isInitialized = true;

    const reduceMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reuse the page's hero image as the first slide for better LCP.
    const existingImg = heroOverlay.querySelector('img');
    const existingSrc = existingImg?.getAttribute('src')?.trim();
    const existingAlt = existingImg?.getAttribute('alt')?.trim();

    let initialIndex = heroSlides.findIndex(s => s.src === existingSrc);
    if (initialIndex < 0) initialIndex = 0;

    const slidesForThisPage = [
        ...heroSlides.slice(initialIndex),
        ...heroSlides.slice(0, initialIndex)
    ];

    const sizes = '100vw';
    currentSlide = 0;

    const slideshowEl = document.createElement('div');
    slideshowEl.className = 'hero-slideshow';
    slideshowEl.setAttribute('aria-label', 'SHEBE FARMS photo slideshow');

    const slideEls = [];
    const slideImgs = [];

    slidesForThisPage.forEach((slide, i) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = `hero-slide${i === 0 ? ' active' : ''}`;
        slideDiv.setAttribute('data-index', String(i));

        if (i === 0 && existingImg) {
            existingImg.classList.remove('hero-overlay-img');
            existingImg.classList.add('hero-slide-img');

            existingImg.loading = 'eager';
            existingImg.decoding = 'async';
            existingImg.alt = slide.alt || existingAlt || '';
            existingImg.src = slide.src;
            existingImg.setAttribute('data-loaded', 'true');
            existingImg.srcset = buildHeroSrcSet(slide.src);
            existingImg.sizes = sizes;
            existingImg.setAttribute('fetchpriority', 'high');

            slideDiv.appendChild(existingImg);
            slideImgs.push(existingImg);
        } else {
            const imgEl = document.createElement('img');
            imgEl.className = 'hero-slide-img';
            imgEl.alt = slide.alt || '';
            imgEl.loading = 'lazy';
            imgEl.decoding = 'async';
            imgEl.setAttribute('data-src', slide.src);
            imgEl.setAttribute('data-srcset', buildHeroSrcSet(slide.src));
            imgEl.setAttribute('data-sizes', sizes);

            slideDiv.appendChild(imgEl);
            slideImgs.push(imgEl);
        }

        slideEls.push(slideDiv);
        slideshowEl.appendChild(slideDiv);
    });

    // Clear existing overlay content and mount slideshow.
    heroOverlay.innerHTML = '';
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
    const dots = [];
    slidesForThisPage.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `hero-slide-dot${i === 0 ? ' active' : ''}`;
        dot.setAttribute('type', 'button');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
            resetAutoPlay();
            showSlide(i);
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);
    });

    function showSlide(index) {
        const len = slidesForThisPage.length;
        currentSlide = ((index % len) + len) % len;

        slideEls.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
        dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));

        // Only load the active slide image to keep mobile Lighthouse fast.
        ensureImageLoaded(slideImgs[currentSlide]);
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    function pauseAutoPlay() {
        clearInterval(slideInterval);
        slideInterval = null;
    }

    function startAutoPlay() {
        if (reduceMotion) return;
        if (slideInterval) return;
        slideInterval = window.setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        pauseAutoPlay();
        startAutoPlay();
    }

    nav.querySelector('.hero-slide-prev')
        .addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
    nav.querySelector('.hero-slide-next')
        .addEventListener('click', () => { nextSlide(); resetAutoPlay(); });

    let touchStartX = 0;
    heroOverlay.addEventListener(
        'touchstart',
        e => { touchStartX = e.changedTouches[0].clientX; },
        { passive: true }
    );
    heroOverlay.addEventListener(
        'touchend',
        e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); resetAutoPlay(); }
        },
        { passive: true }
    );

    heroOverlay.addEventListener('mouseenter', pauseAutoPlay);
    heroOverlay.addEventListener('mouseleave', startAutoPlay);

    // Ensure LCP (slide 0) image is loaded.
    ensureImageLoaded(slideImgs[0]);
    if (!reduceMotion) startAutoPlay();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroSlideshow);
} else {
    initHeroSlideshow();
}
