document.getElementById('btnVerificar').addEventListener('click', () => {
    const questoes = document.querySelectorAll('.card-pergunta');
    let totalAcertos = 0;
    let todasRespondidas = true;

    // 1. Validar se o aluno respondeu tudo antes de corrigir
    questoes.forEach((card, index) => {
        const numQuestao = index + 1;
        const marcada = card.querySelector(`input[name="q${numQuestao}"]:checked`);
        if (!marcada) {
            todasRespondidas = false;
        }
    });

    if (!todasRespondidas) {
        alert('Por favor, responda todas as questões antes de verificar o gabarito!');
        return;
    }

    // 2. Corrigir as questões e exibir a explicação
    questoes.forEach((card, index) => {
        const numQuestao = index + 1;
        const respostaCorreta = card.getAttribute('data-correta');
        const opcaoMarcada = card.querySelector(`input[name="q${numQuestao}"]:checked`).value;
        
        const blocoGabarito = card.querySelector('.gabarito-bloco');
        const statusTexto = card.querySelector('.status-resposta');

        blocoGabarito.classList.remove('hidden', 'correto', 'errado');

        if (opcaoMarcada === respostaCorreta) {
            totalAcertos++;
            blocoGabarito.classList.add('correto');
            statusTexto.textContent = '✅ Resposta Correta!';
        } else {
            blocoGabarito.classList.add('errado');
            statusTexto.textContent = `❌ Resposta Incorreta! (A alternativa certa era a ${respostaCorreta.toUpperCase()})`;
        }
    });

    // 3. Exibir painel de pontuação final
    const resultadoDiv = document.getElementById('resultadoFinal');
    resultadoDiv.classList.remove('hidden', 'sucesso', 'atencao');

    if (totalAcertos === questoes.length) {
        resultadoDiv.classList.add('sucesso');
        resultadoDiv.textContent = `Excelente! Você acertou todas as ${totalAcertos} questões. Prontinho para a prova!`;
    } else {
        resultadoDiv.classList.add('atencao');
        resultadoDiv.textContent = `Você acertou ${totalAcertos} de ${questoes.length} questões. Revise as explicações acima!`;
    }
});
