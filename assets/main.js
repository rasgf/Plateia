let currentIndex = 0;
let totalItems = 0;
let carouselItems = [];
let carouselInner = null;
let autoplayInterval;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const localQuotes = [
    {
        id: "local-1",
        text: "A arte é longa, a vida é breve.",
        author: "Hipócrates"
    },
    {
        id: "local-2",
        text: "A arte diz o indizível.",
        author: "Leonardo da Vinci"
    },
    {
        id: "local-3",
        text: "A arte é a mentira que nos permite conhecer a verdade.",
        author: "Pablo Picasso"
    },
    {
        id: "local-4",
        text: "A arte é o espelho da sociedade.",
        author: "Bertolt Brecht"
    },
    {
        id: "local-5",
        text: "A arte existe porque a vida não basta.",
        author: "Ferreira Gullar"
    },
    {
        id: "local-6",
        text: "A arte é a expressão do mais profundo pensamento pelo caminho mais simples.",
        author: "Albert Einstein"
    },
    {
        id: "local-7",
        text: "A arte é a mão direita da natureza.",
        author: "Friedrich Schiller"
    },
    {
        id: "local-8",
        text: "A arte é o reflexo da alma no espelho da vida.",
        author: "Machado de Assis"
    }
];

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

async function getRandomQuote() {
    // API Simples: Advice Slip API (geralmente tem CORS aberto)
    const apiUrl = 'https://api.adviceslip.com/advice';

    try {
        console.log('Tentando buscar da Advice Slip API...');
        const response = await fetch(apiUrl, {
            cache: "no-cache" // Evita que o navegador use cache antigo
        });
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar conselho: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data && data.slip) {
            console.log('Sucesso com Advice Slip API!');
            return {
                id: `advice-${data.slip.id}`, // Adiciona prefixo para evitar colisão com IDs locais
                text: data.slip.advice,
                author: "Conselho", // Esta API não fornece autor
                timestamp: new Date().getTime()
            };
        } else {
            throw new Error('Formato de resposta inválido da Advice Slip API');
        }
    } catch (error) {
        console.error('Falha ao buscar da Advice Slip API. Usando citação local.', error);
        
        // Fallback: Usar citações locais
        const randomIndex = Math.floor(Math.random() * localQuotes.length);
        return {
            ...localQuotes[randomIndex],
            timestamp: new Date().getTime()
        };
    }
}

function isFavorite(quoteId) {
    return favorites.some(fav => String(fav.id) === String(quoteId));
}

function toggleFavorite(quote) {
    const quoteIdStr = String(quote.id);
    const index = favorites.findIndex(fav => String(fav.id) === quoteIdStr);
    
    if (index === -1) {
        favorites.push({...quote, id: quoteIdStr});
    } else {
        favorites.splice(index, 1);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderQuote(quote); 
    renderFavorites();
}

function renderQuote(quote) {
    const quoteElement = document.getElementById('quote-display');
    if (!quoteElement) return;

    quoteElement.innerHTML = `
        <blockquote class="quote">
            <p>${quote.text}</p>
            <footer>
                <span class="author">— ${quote.author}</span>
                <button class="favorite-btn" onclick='toggleFavorite(${JSON.stringify(quote)})' title="${isFavorite(quote.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                              stroke="#14213d" 
                              fill="${isFavorite(quote.id) ? '#fca311' : 'none'}" 
                              stroke-width="2"/>
                    </svg>
                </button>
            </footer>
        </blockquote>
    `;
}

async function updateQuoteDisplay() {
    const quoteElement = document.getElementById('quote-display');
    if (!quoteElement) return;

    quoteElement.innerHTML = `
        <blockquote class="quote">
            <p>Carregando conselho...</p>
            <footer>
                <span class="author">Aguarde um momento</span>
            </footer>
        </blockquote>
    `;

    const quote = await getRandomQuote();
    renderQuote(quote);

    quoteElement.classList.add('fade-in');
    setTimeout(() => quoteElement.classList.remove('fade-in'), 500);
}

function renderFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    if (!favoritesContainer) return;
    
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p class="no-favorites">Nenhuma citação/conselho favorito ainda.</p>';
        return;
    }

    favoritesContainer.innerHTML = favorites.map(quote => {
        const quoteIdStr = String(quote.id);
        const quoteForToggle = {...quote, id: quoteIdStr};

        return `
        <div class="favorite-quote">
            <div class="quote"> 
                <p>${quote.text}</p>
                <footer>
                    <span class="author">— ${quote.author}</span>
                    </footer>
                <button 
                    class="favorite-btn remove-fav-btn" 
                    onclick='toggleFavorite(${JSON.stringify(quoteForToggle).replace(/"/g, "&quot;")})' 
                    title="Remover dos favoritos"
                    aria-label="Remover dos favoritos"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#fca311" xmlns="http://www.w3.org/2000/svg">
                         <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                              stroke="#14213d" 
                              stroke-width="2"/>
                    </svg>
                </button>
            </div>
        </div>
    `}).join('');
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

    updateQuoteDisplay();
    renderFavorites();

    const newQuoteBtn = document.getElementById('new-quote');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', updateQuoteDisplay);
    }
});

function fazerLogin(email, senha) {
}