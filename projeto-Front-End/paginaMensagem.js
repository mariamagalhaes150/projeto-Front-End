// PARTE 1: Dados fictícios de teste
const conversas = [
    {
        id: 1,
        nome: "Maria Eduarda",
        foto: "img/profilepicture3.png",
        historico: [
            { texto: "Olá! Esta é uma mensagem recebida de teste.", enviadaPorMim: false },
            { texto: "Oi! Testando o envio de resposta.", enviadaPorMim: true }
        ]
    },
    {
        id: 2,
        nome: "Isadora",
        foto: "img/profilepicture3.png",
        historico: [
            { texto: "Tudo certo com o projeto do grupo?", enviadaPorMim: false }
        ]
    }
];

let conversaSelecionada = null; // Guarda o contato que está aberto no momento

// PARTE 2: Desenhar os contatos na esquerda
function carregarContatos(lista = conversas) {
    const listaContainer = document.getElementById('listaContatos');
    if (!listaContainer) return;
    
    listaContainer.innerHTML = '';

    lista.forEach(contato => {
        const divPerfil = document.createElement('div');
        divPerfil.classList.add('perfilMensagens');

        //  clique para abrir a conversa
        divPerfil.onclick = () => abrirMensagem(contato);

        divPerfil.innerHTML = `
            <img src="${contato.foto}" alt="Foto de ${contato.nome}">
            <h3>${contato.nome}</h3>
        `;

        listaContainer.appendChild(divPerfil);
    });
}

// PARTE 3: Função para abrir o chat oculto
function abrirMensagem(contato) {
    conversaSelecionada = contato;

    // Esconde a imagem do meio
    const imgFundo = document.querySelector('.imgFundo');
    if (imgFundo) imgFundo.style.display = 'none';

    // Torna visível a caixa de chat que estava oculta (adiciona a classe .ativo)
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.classList.add('ativo');

    // Atualiza nome e foto no topo do chat
    document.getElementById('chatNomeUsuario').innerText = contato.nome;
    document.getElementById('chatFotoPerfil').src = contato.foto;

    // Desenha as bolhas de mensagens dessa conversa
    renderizarMensagens();
}

// Função que cria as bolhas dentro de #chatMensagens
function renderizarMensagens() {
    const areaMensagens = document.getElementById('chatMensagens');
    areaMensagens.innerHTML = ''; // Limpa antes de desenhar

    conversaSelecionada.historico.forEach(msg => {
        const balao = document.createElement('div');
        balao.classList.add('balao');
        balao.classList.add(msg.enviadaPorMim ? 'enviada' : 'recebida');
        balao.innerText = msg.texto;
        areaMensagens.appendChild(balao);
    });

    // Rola para a mensagem mais recente no final da caixa
    areaMensagens.scrollTop = areaMensagens.scrollHeight;
}

// Função que escuta o que é digitado no campo de pesquisa
function configurarPesquisa() {
    const inputPesquisa = document.getElementById('botaoPesquisar');
    if (!inputPesquisa) return;

    // O evento 'input' dispara a cada letra digitada ou apagada
    inputPesquisa.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase(); // Converte o texto digitado para minúsculas

        // Filtra os contatos cujo nome contém o texto digitado
        const filtrados = conversas.filter(contato => 
            contato.nome.toLowerCase().includes(termo)
        );

        // Redesenha a lista na tela apenas com os resultados filtrados
        carregarContatos(filtrados);
    });
}

// Chame a função dentro do DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    carregarContatos();
    configurarPesquisa(); // <--- Adicione esta linha
    
    // ...seus outros eventos (btnEnviar, keypress Enter)...
});
