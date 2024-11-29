document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  if (carousel) {
      const carouselInner = carousel.querySelector('.carousel-inner');
      const carouselItems = carousel.querySelectorAll('.carousel-item');
      const prevButton = carousel.querySelector('.prev');
      const nextButton = carousel.querySelector('.next');
      let currentIndex = 0;
      const totalItems = carouselItems.length;
      let autoplayInterval;

      function moveCarousel(step) {
          currentIndex = (currentIndex + step + totalItems) % totalItems;
          const offset = currentIndex * 100;
          carouselInner.style.transform = `translateX(-${offset}%)`;
      }

      function startAutoplay() {
          autoplayInterval = setInterval(() => moveCarousel(1), 4000); 
      }

      function stopAutoplay() {
          clearInterval(autoplayInterval);
      }

      if (prevButton) {
          prevButton.addEventListener('click', () => moveCarousel(-1));
      }
      if (nextButton) {
          nextButton.addEventListener('click', () => moveCarousel(1));
      }

      carousel.addEventListener('mouseover', stopAutoplay);
      carousel.addEventListener('mouseout', startAutoplay);

      startAutoplay();

      document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') moveCarousel(-1);
          if (e.key === 'ArrowRight') moveCarousel(1);
      });
  }

  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  if (hamburgerMenu && navLinks) {
      hamburgerMenu.addEventListener('click', function() {
          navLinks.classList.toggle('active');
      });
  }
});