let currentQuestion = 1;

// Função para navegar entre as perguntas
function navigateToQuestion(questionNumber) {
    if (questionNumber < 1 || questionNumber > 3) return;

    // Oculta todas as perguntas
    document.querySelectorAll('.question').forEach(question => {
        question.classList.remove('active');
    });

    // Exibe a pergunta selecionada
    document.querySelector(`#question${questionNumber}`).classList.add('active');

    // Atualiza o botão ativo no menu
    document.querySelectorAll('.menu-btn').forEach(button => {
        button.classList.remove('active');
    });

    document.querySelector(`#menu${questionNumber}`).classList.add('active');

    currentQuestion = questionNumber;

    updateNavigationButtons();
    updateFinishButton();
}

// Atualiza os botões de navegação (setas)
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentQuestion === 1;
    nextBtn.disabled = currentQuestion === 3;
}

// Verifica se todas as perguntas foram respondidas
function areAllQuestionsAnswered() {
    return Array.from(document.querySelectorAll('.question')).every(question => {
        return question.querySelector('input[type="radio"]:checked') !== null;
    });
}

// Atualiza o estado do botão "Finalizar"
function updateFinishButton() {
    const finishBtn = document.getElementById('finishBtn');
    finishBtn.disabled = !areAllQuestionsAnswered();
}

// Event listeners para as setas
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentQuestion > 1) navigateToQuestion(currentQuestion - 1);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentQuestion < 3) navigateToQuestion(currentQuestion + 1);
});

// Atualiza o botão "Finalizar" ao selecionar uma resposta
document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', updateFinishButton);
});

// Event listener para o botão "Finalizar"
document.getElementById('finishBtn').addEventListener('click', () => {
    if (areAllQuestionsAnswered()) {
        // Oculta a seção do quiz e o texto de introdução
        document.querySelector('.quiz-section').classList.add('hidden');

        // Exibe a seção de agradecimento
        document.getElementById('thankYouSection').classList.remove('hidden');
    } else {
        alert('Por favor, responda todas as perguntas antes de finalizar.');
    }
});





