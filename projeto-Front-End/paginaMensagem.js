// PARTE 1: Dados fictícios de teste
const conversas = [
    {
        id: 1,
        nome: "Usuário de Teste 1",
        foto: "img/profilepicture3.png",
        historico: [
            { texto: "Olá! Esta é uma mensagem recebida de teste.", enviadaPorMim: false },
            { texto: "Oi! Testando o envio de resposta.", enviadaPorMim: true }
        ]
    },
    {
        id: 2,
        nome: "Usuário de Teste 2",
        foto: "img/profilepicture3.png",
        historico: [
            { texto: "Tudo certo com o projeto do grupo?", enviadaPorMim: false }
        ]
    }
];

let conversaSelecionada = null; // Guarda o contato que está aberto no momento

// PARTE 2: Desenhar os contatos na esquerda
function carregarContatos() {
    const listaContainer = document.getElementById('listaContatos');
    listaContainer.innerHTML = '';

    conversas.forEach(contato => {
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

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', carregarContatos);

// PARTE 4: Enviar novas mensagens
function enviarMensagem() {
    // 1. Pega o campo de texto e remove espaços vazios das pontas
    const input = document.getElementById('inputMensagem');
    const texto = input.value.trim();

    // 2. Se o texto estiver vazio ou nenhum contato estiver selecionado, não faz nada
    if (!texto || !conversaSelecionada) return;

    // 3. Adiciona a nova mensagem enviada no histórico da conversa ativa
    conversaSelecionada.historico.push({
        texto: texto,
        enviadaPorMim: true
    });

    // 4. Limpa o campo de digitação
    input.value = '';

    // 5. Redesenha as mensagens na tela atualizadas
    renderizarMensagens();
}

// Conecta os eventos do botão e da tecla Enter ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Executa a Parte 2 que já tínhamos feito
    carregarContatos();

    // Clique no botão Enviar
    document.getElementById('btnEnviar').addEventListener('click', enviarMensagem);

    // Pressionar a tecla Enter dentro do campo de texto
    document.getElementById('inputMensagem').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') enviarMensagem();
    });
});