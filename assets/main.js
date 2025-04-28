var currentIndex = 0;
var totalItems = 0;
var carouselItems = [];
var carouselInner = null;
var autoplayInterval;

// Variáveis das citações
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

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

// Funções das citações
async function fetchQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        displayQuote(data);
    } catch (error) {
        console.error('Erro ao buscar citação:', error);
        alert('Erro ao buscar citação. Por favor, tente novamente.');
    }
}

function displayQuote(quote) {
    const quotesContainer = document.getElementById('quotes-container');
    if (!quotesContainer) return;
    
    quotesContainer.innerHTML = `
        <div class="quote-card">
            <p class="quote-text">"${quote.content}"</p>
            <p class="quote-author">- ${quote.author}</p>
            <button class="favorite-btn" onclick="toggleFavorite(${JSON.stringify(quote)})" title="Favoritar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                          stroke="#14213d" 
                          fill="${isFavorite(quote) ? '#fca311' : 'none'}" 
                          stroke-width="2"/>
                </svg>
            </button>
        </div>
    `;
}

function toggleFavorite(quote) {
    const index = favorites.findIndex(fav => fav._id === quote._id);
    if (index === -1) {
        favorites.push(quote);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayQuote(quote);
    renderFavorites();
}

function isFavorite(quote) {
    return favorites.some(fav => fav._id === quote._id);
}

function renderFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    if (!favoritesContainer) return;
    
    favoritesContainer.innerHTML = favorites.map(quote => `
        <div class="favorite-item">
            <div class="favorite-content">
                <p class="quote-text">"${quote.content}"</p>
                <p class="quote-author">- ${quote.author}</p>
            </div>
            <button class="remove-btn" onclick="removeFromFavorites('${quote._id}')" title="Remover dos favoritos">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" 
                          fill="#14213d"/>
                </svg>
            </button>
        </div>
    `).join('');
}

function removeFromFavorites(quoteId) {
    favorites = favorites.filter(quote => quote._id !== quoteId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
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

    // Inicialização das citações
    const newQuoteBtn = document.getElementById('new-quote');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', fetchQuote);
        fetchQuote(); // Buscar primeira citação
    }
    renderFavorites();
});

// Verifica se o usuário está logado ao carregar a página
window.onload = function() {
    var usuarioLogado = localStorage.getItem('usuario');
    if (usuarioLogado) {
        var usuario = JSON.parse(usuarioLogado);
        mostrarInfoUsuario(usuario);
    }
};

// Alterna entre os formulários de login e cadastro
function toggleFormulario() {
    var loginForm = document.getElementById('login-form');
    var cadastroForm = document.getElementById('cadastro-form');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'flex';
        cadastroForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        cadastroForm.style.display = 'flex';
    }
}

// Tenta fazer login com as credenciais fornecidas
function tentarLogin() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    
    if (!email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    var usuario = fazerLogin(email, senha);
    
    if (usuario) {
        mostrarInfoUsuario(usuario);
    } else {
        alert('Usuário não encontrado ou senha incorreta. Por favor, tente novamente.');
    }
}

// Tenta cadastrar um novo usuário
function tentarCadastro() {
    var nome = document.getElementById('cadastro-nome').value;
    var email = document.getElementById('cadastro-email').value;
    var senha = document.getElementById('cadastro-senha').value;
    var confirmarSenha = document.getElementById('cadastro-confirmar-senha').value;
    
    if (!nome || !email || !senha || !confirmarSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
    }
    
    var resultado = cadastrarUsuario(nome, email, senha);
    
    if (resultado.sucesso) {
        alert(resultado.mensagem);
        document.getElementById('cadastro-nome').value = '';
        document.getElementById('cadastro-email').value = '';
        document.getElementById('cadastro-senha').value = '';
        document.getElementById('cadastro-confirmar-senha').value = '';
        toggleFormulario();
    } else {
        alert(resultado.mensagem);
    }
}

// Mostra as informações do usuário logado
function mostrarInfoUsuario(usuario) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('cadastro-form').style.display = 'none';
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('nome-usuario').textContent = usuario.nome;
}

// Faz logout do usuário
function fazerLogout() {
    localStorage.removeItem('usuario');
    document.getElementById('login-form').style.display = 'flex';
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('email').value = '';
    document.getElementById('senha').value = '';
}