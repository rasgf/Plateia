window.usuarios = [
    {id: 1, email: "ricardo@hotmail.com", nome: "Ricardo", senha: "123456"},
    {id: 2, email: "usuario2@exemplo.com", nome: "Usuário 2", senha: "123456"},
    {id: 3, email: "usuario3@exemplo.com", nome: "Usuário 3", senha: "123456"}
];

window.addEventListener('load', function() {
    var usuariosSalvos = localStorage.getItem('usuarios_cadastrados');
    if (usuariosSalvos) {
        var usuariosArray = JSON.parse(usuariosSalvos);
        for (var i = 0; i < usuariosArray.length; i++) {
            window.usuarios.push(usuariosArray[i]);
        }
    } else {
        localStorage.setItem('usuarios_cadastrados', JSON.stringify([]));
    }
    
    verificarLogin();
});

function verificarLogin() {
    var usuarioLogado = localStorage.getItem('usuario');
    
    if (usuarioLogado) {
        var usuario = JSON.parse(usuarioLogado);
        
        var perfilLink = document.querySelector('.nav-links li:last-child a');
        
        if (perfilLink) {
            perfilLink.title = "Logado como: " + usuario.nome;
            perfilLink.classList.add('logado');
            perfilLink.href = 'usuarios.html';
        }
    }
}

window.fazerLogin = function(email, senha) {
    if (!email || !senha) return false;
    
    for (var i = 0; i < window.usuarios.length; i++) {
        if (window.usuarios[i].email === email && window.usuarios[i].senha === senha) {
            var usuarioLogado = {
                id: window.usuarios[i].id,
                email: window.usuarios[i].email,
                nome: window.usuarios[i].nome
            };
            localStorage.setItem('usuario', JSON.stringify(usuarioLogado));
            return usuarioLogado;
        }
    }
    
    return null;
};

window.cadastrarUsuario = function(nome, email, senha) {
    for (var i = 0; i < window.usuarios.length; i++) {
        if (window.usuarios[i].email === email) {
            return { sucesso: false, mensagem: "Este email já está cadastrado." };
        }
    }
    
    var novoId = window.usuarios.length + 1;
    
    var novoUsuario = {
        id: novoId,
        email: email,
        nome: nome,
        senha: senha
    };
    
    window.usuarios.push(novoUsuario);
    
    var usuariosSalvos = JSON.parse(localStorage.getItem('usuarios_cadastrados')) || [];
    usuariosSalvos.push(novoUsuario);
    localStorage.setItem('usuarios_cadastrados', JSON.stringify(usuariosSalvos));
    
    return { sucesso: true, mensagem: "Cadastro realizado com sucesso!" };
}; 