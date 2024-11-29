document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    
    if (carousel) {
        const carouselInner = carousel.querySelector('.carousel-inner');
        const carouselItems = carousel.querySelectorAll('.carousel-item');
        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');

        let currentIndex = 0;
        const totalItems = carouselItems.length;

        window.moveCarousel = function(step) {
            currentIndex = (currentIndex + step + totalItems) % totalItems;
            const offset = currentIndex * 100; // Alterado de -currentIndex para currentIndex
            carouselInner.style.transform = `translateX(-${offset}%)`; // Mantido o sinal de negativo
          };
          
          if (prevButton) {
            prevButton.addEventListener('click', () => moveCarousel(-1)); // Alterado de -1 para 1
          }
          if (nextButton) {
            nextButton.addEventListener('click', () => moveCarousel(1)); // Alterado de 1 para -1
          }
           

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

// Selecione o menu hambúrguer e a lista de navegação
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

// Adicione um evento de clique ao menu hambúrguer
hamburgerMenu.addEventListener('click', function() {
  // Toggle a classe 'active' na lista de navegação
  navLinks.classList.toggle('active');
});

// Adicione também a função toggleMenu para garantir compatibilidade
function toggleMenu() {
  navLinks.classList.toggle('active');
}