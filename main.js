let currentSlide = 0;
const slides = document.querySelectorAll('#slide');
const totalSlides = slides.length;
let isScrolling = false;

document.body.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

function updateSlides() {
    slides.forEach((slide, index) => {
        const slideIndex = parseInt(slide.dataset.index);
        const position = slideIndex - currentSlide;
        
        if (position === 0) {
            slide.style.transform = 'translateY(0)';
            slide.style.zIndex = '10';
        } else if (position > 0) {
            slide.style.transform = 'translateY(100%)';
            slide.style.zIndex = '1';
        } else {
            slide.style.transform = 'translateY(-100%)';
            slide.style.zIndex = '1';
        }
    });
}
        
function goToSlide(index) {
    if (index >= 0 && index < totalSlides && !isScrolling) {
        currentSlide = index;
        updateSlides();
    }
}

function handleScroll(e) {
    if (isScrolling) return;
    const delta = e.deltaY || e.detail || e.wheelDelta;
    if (delta > 0 && currentSlide < totalSlides - 1) {
        isScrolling = true;
        currentSlide++;
        updateSlides();
        setTimeout(() => { isScrolling = false; }, 800);
    } else if (delta < 0 && currentSlide > 0) {
        isScrolling = true;
        currentSlide--;
        updateSlides();
        setTimeout(() => { isScrolling = false; }, 800);
    }
}

window.addEventListener('wheel', handleScroll, { passive: true });
window.addEventListener('DOMMouseScroll', handleScroll, { passive: true });

let touchStartY = 0;
let touchStartTime = 0;
const minSwipeDistance = 30;
const maxSwipeTime = 500;

window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
}, { passive: true });

window.addEventListener('touchend', (e) => {
    if (isScrolling) return;
            
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndTime = Date.now();
    const diff = touchStartY - touchEndY;
    const timeDiff = touchEndTime - touchStartTime;

    if (diff > minSwipeDistance && timeDiff < maxSwipeTime && currentSlide < totalSlides - 1) {
        isScrolling = true;
        currentSlide++;
        updateSlides();
        setTimeout(() => { isScrolling = false; }, 800);
    } else if (diff < -minSwipeDistance && timeDiff < maxSwipeTime && currentSlide > 0) {
        isScrolling = true;
        currentSlide--;
        updateSlides();
        setTimeout(() => { isScrolling = false; }, 800);
    }
}, { passive: true });

window.addEventListener('keydown', (e) => {
    if (isScrolling) return;
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSlide < totalSlides - 1) {
            isScrolling = true;
            currentSlide++;
            updateSlides();
            setTimeout(() => { isScrolling = false; }, 800);
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSlide > 0) {
            isScrolling = true;
            currentSlide--;
            updateSlides();
            setTimeout(() => { isScrolling = false; }, 800);
        }
    }
});

updateSlides();

const presentEmoji = document.getElementById('presentEmoji');
const giftsContainer = document.getElementById('giftsContainer');

if (presentEmoji && giftsContainer) {
    presentEmoji.addEventListener('click', function() {
        presentEmoji.classList.add('enlarge');
        setTimeout(() => {
            document.querySelector('.present-container').style.display = 'none';
            giftsContainer.classList.remove('hidden');
            giftsContainer.classList.add('show');
        }, 1000);
    });
}