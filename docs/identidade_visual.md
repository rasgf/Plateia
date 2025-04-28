# Guia de Estilo

## Cores
### Paleta Principal
```css
:root {
    --primary-color: #000000;     /* Preto */
    --secondary-color: #FFFFFF;   /* Branco */
    --accent-color: #FF0000;      /* Vermelho */
    --background-color: #F5F5F5;  /* Cinza claro */
    --text-color: #333333;        /* Cinza escuro */
}
```

### Uso das Cores
- **Primary**: Textos principais, headers, elementos de destaque
- **Secondary**: Fundos, elementos de contraste
- **Accent**: Botões de ação, links, elementos interativos
- **Background**: Fundo de seções, cards
- **Text**: Textos em geral, parágrafos

## Tipografia
### Fontes
```css
:root {
    --font-primary: 'Roboto', sans-serif;
    --font-secondary: 'Open Sans', sans-serif;
    --font-accent: 'Montserrat', sans-serif;
}
```

### Hierarquia de Texto
```css
h1 { font-size: 2.5rem; }    /* 40px */
h2 { font-size: 2rem; }      /* 32px */
h3 { font-size: 1.75rem; }   /* 28px */
h4 { font-size: 1.5rem; }    /* 24px */
p { font-size: 1rem; }       /* 16px */
small { font-size: 0.875rem; } /* 14px */
```

## Componentes

### Botões
```css
.btn {
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: var(--primary-color);
    color: var(--secondary-color);
}

.btn-secondary {
    background-color: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
}
```

### Cards
```css
.card {
    background: var(--secondary-color);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### Formulários
```css
.form-input {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.form-label {
    font-weight: 500;
    margin-bottom: 8px;
}
```

## Espaçamento
### Sistema de Grid
- Container máximo: 1200px
- Colunas: 12
- Gutters: 24px

### Margens e Padding
```css
:root {
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
}
```

## Ícones
- Conjunto de ícones: Font Awesome
- Tamanhos padrão: 16px, 24px, 32px
- Cor: herdar do texto pai
- Alinhamento: centralizado com texto

## Imagens
### Dimensões
- Avatar: 40x40px
- Thumbnail: 150x150px
- Card image: 300x200px
- Hero image: 1200x600px

### Formatos
- Fotos: JPEG/JPG
- Ícones e logos: PNG com transparência
- Ilustrações: SVG

## Animações
```css
:root {
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

### Hover States
```css
.interactive-element {
    transition: var(--transition-normal);
}

.interactive-element:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
```

## Responsividade
### Breakpoints
```css
/* Mobile First */
@media (min-width: 480px) { /* Smartphones */ }
@media (min-width: 768px) { /* Tablets */ }
@media (min-width: 1024px) { /* Desktops */ }
@media (min-width: 1200px) { /* Large Desktops */ }
```

## Acessibilidade
- Contraste mínimo: 4.5:1
- Tamanho mínimo de fonte: 16px
- Focus states visíveis
- Alt text em todas as imagens
- ARIA labels quando necessário

## SEO
- Títulos semânticos (h1-h6)
- Meta descriptions
- Open Graph tags
- Sitemap XML
- Robots.txt 