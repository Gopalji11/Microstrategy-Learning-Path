document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlideIndex = 0;

    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const btnMosaic = document.getElementById('btn-mosaic');
    const progressBar = document.getElementById('progress-bar');
    const slideCounter = document.getElementById('slide-counter');
    const mosaicOverlay = document.getElementById('mosaic-overlay');
    const container = document.getElementById('presentation-container');

    // Update Progress
    function updateProgress() {
        const progress = ((currentSlideIndex + 1) / totalSlides) * 100;
        progressBar.style.width = `${progress}%`;
        slideCounter.innerText = `${currentSlideIndex + 1} / ${totalSlides}`;
        
        // Update Mosaic Tiles
        document.querySelectorAll('.mosaic-tile').forEach((tile, idx) => {
            if (idx === currentSlideIndex) tile.classList.add('active');
            else tile.classList.remove('active');
        });
    }

    // Go to slide
    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        
        // Remove active class from current
        slides[currentSlideIndex].classList.remove('active');
        
        // Add active class to new
        currentSlideIndex = index;
        slides[currentSlideIndex].classList.add('active');
        
        // Add animation class
        const content = slides[currentSlideIndex].querySelector('.slide-content, .content-grid');
        if (content) {
            content.classList.remove('animate-in');
            void content.offsetWidth; // Trigger reflow
            content.classList.add('animate-in');
        }

        updateProgress();
        
        // Hide mosaic if open
        mosaicOverlay.classList.remove('show');
    }

    // Initialize Mosaic Overlay
    function initMosaic() {
        mosaicOverlay.innerHTML = '';
        slides.forEach((slide, index) => {
            const title = slide.querySelector('h1').innerText;
            const tag = slide.querySelector('.tag').innerText;
            
            const tile = document.createElement('div');
            tile.className = 'mosaic-tile';
            if (index === currentSlideIndex) tile.classList.add('active');
            
            tile.innerHTML = `
                <div>
                    <div style="font-size: 0.6rem; opacity: 0.7; margin-bottom: 5px;">${tag}</div>
                    <div>${title}</div>
                </div>
            `;
            
            tile.addEventListener('click', () => {
                goToSlide(index);
            });
            
            mosaicOverlay.appendChild(tile);
        });
    }

    initMosaic();

    // Event Listeners
    btnNext.addEventListener('click', () => {
        if (currentSlideIndex < totalSlides - 1) goToSlide(currentSlideIndex + 1);
    });

    btnPrev.addEventListener('click', () => {
        if (currentSlideIndex > 0) goToSlide(currentSlideIndex - 1);
    });

    btnMosaic.addEventListener('click', () => {
        mosaicOverlay.classList.toggle('show');
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            if (currentSlideIndex < totalSlides - 1) goToSlide(currentSlideIndex + 1);
        } else if (e.key === 'ArrowLeft') {
            if (currentSlideIndex > 0) goToSlide(currentSlideIndex - 1);
        } else if (e.key === 'm' || e.key === 'M') {
            mosaicOverlay.classList.toggle('show');
        } else if (e.key === 'Escape') {
            mosaicOverlay.classList.remove('show');
        }
    });

    // Handle touch/swipe (basic)
    let touchstartX = 0;
    let touchendX = 0;

    function handleGesture() {
        if (touchendX < touchstartX - 50) {
            if (currentSlideIndex < totalSlides - 1) goToSlide(currentSlideIndex + 1);
        }
        if (touchendX > touchstartX + 50) {
            if (currentSlideIndex > 0) goToSlide(currentSlideIndex - 1);
        }
    }

    container.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleGesture();
    });

    // Init first slide animation
    updateProgress();
    const firstContent = slides[0].querySelector('.content-grid');
    if (firstContent) firstContent.classList.add('animate-in');
});
