
var currentIndex = 0;
var totalItems = 0;
var carouselItems = [];
var carouselInner = null;
var autoplayInterval;

function toggleMenu() {
    var navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

window.moveCarousel = function(step) {
    currentIndex = (currentIndex + step + totalItems) % totalItems;
    
    if (carouselInner) {
        carouselInner.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    }
};

function startAutoplay() {
    autoplayInterval = setInterval(function() {
        window.moveCarousel(1);
    }, 5000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

document.addEventListener('DOMContentLoaded', function() {
    var carousel = document.querySelector('.carousel');
    if (carousel) {
        carouselInner = carousel.querySelector('.carousel-inner');
        carouselItems = carousel.querySelectorAll('.carousel-item');
        totalItems = carouselItems.length;
        
        var prevButton = carousel.querySelector('.prev');
        var nextButton = carousel.querySelector('.next');
        
        if (prevButton) {
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.moveCarousel(-1);
                stopAutoplay();
                startAutoplay();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.moveCarousel(1);
                stopAutoplay();
                startAutoplay();
            });
        }

        carousel.addEventListener('mouseover', stopAutoplay);
        carousel.addEventListener('mouseout', startAutoplay);

        startAutoplay();
    }
    
    var hamburgerMenu = document.querySelector('.hamburger-menu');
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleMenu);
    }
});