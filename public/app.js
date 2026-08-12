let perguntas = [];
let paginaAtual = 1;
const itensPorPagina = 5;
const respostasSalvas = {}; // Guarda as respostas do aluno ex: {1: 'a', 2: 'c'}

// 1. Carregar as perguntas do arquivo JSON isolado
async function carregarPerguntas() {
    try {
        const resposta = await fetch('/data/perguntas.json');
        perguntas = await resposta.json(); // Código corrigido e limpo aqui
        renderizarPagina();
    } catch (erro) {
        console.error('Erro ao carregar o banco de dados de questões:', erro);
        document.getElementById('quiz-dinamico').innerHTML = '<p class="alerta errado">Erro ao carregar o simulado.</p>';
    }
}

// 2. Renderizar apenas as 5 perguntas da página ativa
function renderizarPagina() {
    const container = document.getElementById('quiz-dinamico');
    container.innerHTML = '';

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const questoesDaPagina = perguntas.slice(inicio, fim);

    questoesDaPagina.forEach((q) => {
        const card = document.createElement('section');
        card.className = 'card-pergunta';
        card.setAttribute('data-id', q.id);
        card.setAttribute('data-correta', q.correta);

        // Verifica se o aluno já tinha marcado alguma alternativa nesta questão antes
        const checado = (alt) => respuestasSalvas[q.id] === alt ? 'checked' : '';

        card.innerHTML = `
            <span class="tag-questao">Questão ${String(q.id).padStart(2, '0')}</span>
            <h2>${q.pergunta}</h2>
            <div class="alternativas">
                <label><input type="radio" name="q${q.id}" value="a" ${checado('a')}> ${q.alternativas.a}</label>
                <label><input type="radio" name="q${q.id}" value="b" ${checado('b')}> ${q.alternativas.b}</label>
                <label><input type="radio" name="q${q.id}" value="c" ${checado('c')}> ${q.alternativas.c}</label>
                <label><input type="radio" name="q${q.id}" value="d" ${checado('d')}> ${q.alternativas.d}</label>
            </div>
            <div class="gabarito-bloco hidden">
                <p class="status-resposta"></p>
                <p class="explicacao"><strong>Explicação:</strong> ${q.explicacao}</p>
            </div>
        `;

        // Ouvinte para salvar a marcação caso o aluno mude de página
        card.querySelectorAll('input[type="radio"]').forEach((radio) => {
            radio.addEventListener('change', (e) => {
                respuestasSalvas[q.id] = e.target.value;
            });
        });

        container.appendChild(card);
    });

    atualizarControles();
}

// 3. Atualizar estados dos botões e paginação
function atualizarControles() {
    const totalPaginas = Math.ceil(perguntas.length / itensPorPagina);
    document.getElementById('indicadorPagina').textContent = `Página ${paginaAtual} de ${totalPaginas}`;
    
    document.getElementById('btnAnterior').disabled = paginaAtual === 1;
    document.getElementById('btnProximo').disabled = paginaAtual === totalPaginas;

    // Só exibe o botão Corrigir se estiver na última página
    const btnVerificar = document.getElementById('btnVerificar');
    if (paginaAtual === totalPaginas) {
        btnVerificar.classList.remove('hidden');
    } else {
        btnVerificar.classList.add('hidden');
    }
}

// Controles de clique de páginas
document.getElementById('btnAnterior').addEventListener('click', () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        renderizarPagina();
    }
});

document.getElementById('btnProximo').addEventListener('click', () => {
    const totalPaginas = Math.ceil(perguntas.length / itensPorPagina);
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        renderizarPagina();
    }
});

// 4. Lógica de Correção Final Ajustada
document.getElementById('btnVerificar').addEventListener('click', () => {
    let totalAcertos = 0;
    let todasRespondidas = true;

    // Valida se o mapa de respostas salvas possui todas as chaves preenchidas
    perguntas.forEach((q) => {
        if (!respuestasSalvas[q.id]) {
            todasRespondidas = false;
        }
    });

    if (!todasRespondidas) {
        alert('Por favor, navegue pelas páginas e responda TODAS as 10 questões antes de corrigir!');
        return;
    }

    // Como vamos avaliar, força a exibição de todas as perguntas para o gabarito fazer sentido visual
    document.getElementById('quiz-dinamico').innerHTML = '';
    const container = document.getElementById('quiz-dinamico');
    
    // Oculta os botões de paginação durante a exibição do resultado final
    document.querySelector('.paginacao-controles').classList.add('hidden');
    document.getElementById('btnVerificar').classList.add('hidden');

    perguntas.forEach((q) => {
        const card = document.createElement('section');
        card.className = 'card-pergunta';
        
        const opcaoMarcada = respuestasSalvas[q.id];
        const eCorreta = opcaoMarcada === q.correta;

        if (eCorreta) totalAcertos++;

        card.innerHTML = `
            <span class="tag-questao">Questão ${String(q.id).padStart(2, '0')}</span>
            <h2>${q.pergunta}</h2>
            <div class="gabarito-bloco ${eCorreta ? 'correto' : 'errado'}">
                <p class="status-resposta">${eCorreta ? '✅ Você acertou!' : `❌ Você errou. Sua resposta: ${opcaoMarcada.toUpperCase()} (Correta: ${q.correta.toUpperCase()})`}</p>
                <p class="explicacao"><strong>Explicação:</strong> ${q.explicacao}</p>
            </div>
        `;
        container.appendChild(card);
    });

    const resultadoDiv = document.getElementById('resultadoFinal');
    resultadoDiv.classList.remove('hidden', 'sucesso', 'atencao');

    if (totalAcertos === perguntas.length) {
        resultadoDiv.classList.add('sucesso');
        resultadoDiv.textContent = `Excelente! Perfeito. Você acertou todas as ${totalAcertos} questões do simulado!`;
    } else {
        resultadoDiv.classList.add('atencao');
        resultadoDiv.textContent = `Fim do simulado! Você acertou ${totalAcertos} de ${perguntas.length} questões. Avalie o gabarito explicativo acima.`;
    }
});

// Inicialização automática ao carregar o script
carregarPerguntas();
