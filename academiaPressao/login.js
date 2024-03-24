let usuarioLogado = null;
const API_URL = "https://reqres.in/api/users";
const users = [];

function abrirRegistro() {
    document.getElementById('registro').style.display = 'flex';
}

function fecharRegistro() {
    document.getElementById('registro').style.display = 'none';
}

function entrarBotao() {
    document.getElementById('login').style.display = 'flex';
}


function fecharLogin() {
    document.getElementById('login').style.display = 'none';
}

// Verifica se um email já está cadastrado
function emailJaCadastrado(email) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return true;
        }
    }
    return false;
}

/* Função para validar o email */
function validarEmail(email) {
    const emailEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Mais usados em emails
    return !!email.match(emailEX);
}

// Obtém dados da API de usuários
async function obterDadosAPI() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.data;
}

// Registra um novo usuário
async function registrarUsuario() {
    const novoname = document.getElementById('novoname').value;
    const novoemail = document.getElementById('email').value;
    const novapassword = document.getElementById('novapassword').value;
    const plano = document.getElementById('plano').value;

    // Verifica se já existe um usuário logado
    if (usuarioLogado) {
        alert("Por favor, faça logout antes de registrar um novo usuário.");
        return;
    }

    // Verifica se o email é válido
    if (!validarEmail(novoemail)) {
        alert("Insira um email válido.");
        return;
    }

    // Verifica se o email já está cadastrado
    let emailCadastrado = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === novoemail) {
            emailCadastrado = true;
            break;
        }
    }

    if (emailCadastrado) {
        alert("Email já cadastrado. Por favor, use outro email.");
        return;
    }

    /* Verifica se o nome contém apenas letras */
    if (!novoname.match(/^[a-zA-Z]+$/)) {
        alert("O nome deve conter apenas letras.");
        return;
    }    

    /* Requisição à API */
    const requestBody = {
        name: novoname,
        email: novoemail,
        password: novapassword,
        plano: plano,
    };
    
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    const newUser = await response.json();
    users.push(newUser);

        usuarioLogado = null;

        console.log("Detalhes do usuário registrado:", newUser);

        alert("Usuário registrado com sucesso!");
        fecharRegistro();
}

// Realiza o login do usuário
async function entrarLogin() {
    const emailEntrar = document.getElementById('emailEntrar').value;
    const passwordEntrar = document.getElementById('passwordEntrar').value;

    // Verifica se o email é válido
    if (!validarEmail(emailEntrar)) {
        alert("Insira um email válido.");
        return;
    }

    // Encontra o usuário pelo email
    const user = users.find(u => u.email === emailEntrar);

    if (user) {
        // Verifica se a senha foi digitada
        if (passwordEntrar.trim() === "") {
            alert("Por favor, insira a senha.");
            return;
        }

        if (user.password === passwordEntrar) {

            usuarioLogado = user;

            localStorage.setItem('nomeUsuario', user.name);
            localStorage.setItem('emailUsuario', user.email);
            localStorage.setItem('planoUsuario', user.plano);

            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

            alert(`Login bem-sucedido! Bem-vindo(a) ${user.name}. Seu perfil foi liberado.`);

            usuarioLogado = user;
            fecharLogin();

        } else {
            alert("Existe algo errado. Tente novamente.");
        }
    } else {
        alert("Informação inválida. Tente novamente.");
        console.log("Credenciais inválidas. Tente novamente.");
    }
}

function saiba_mais() {
    window.location.href = "plano_pacotes.html";
}