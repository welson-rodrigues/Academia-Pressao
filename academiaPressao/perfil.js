let usuarioLogado = null;

document.addEventListener('DOMContentLoaded', function () {
    const usuarioLogadoJSON = localStorage.getItem('usuarioLogado');

    if (usuarioLogadoJSON) {
        usuarioLogado = JSON.parse(usuarioLogadoJSON);

        // Preenche os campos com os dados do usuário logado ao carregar a página
        document.getElementById('nomeUsuario').value = usuarioLogado.name;
        document.getElementById('emailUsuario').value = usuarioLogado.email;
        document.getElementById('planoUsuario').value = usuarioLogado.plano;
    } else {
        alert("Faça login antes de entrar no perfil.");
        window.location.href = 'site.html';
    }
});

function sairUsuario() {
    if (usuarioLogado) {
        console.log("Usuário desconectado:", usuarioLogado);
        usuarioLogado = null;
        
        localStorage.removeItem('usuarioLogado');

        alert("Usuário desconectado com sucesso!");
        
        window.location.href = 'site.html';
    } else {
        alert("Nenhum usuário logado.");
    }
}

function voltar(){
    window.location.href = 'site.html';
}