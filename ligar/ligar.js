const imagesContainer = document.getElementById('images');
const storySections = document.querySelectorAll('.story-section');
const result = document.getElementById('result');
const nextRoundButton = document.createElement('button');
let currentRound = 0;
let correctCount = 0;

// Dados de cada rodada
const rounds = [
    {
        images: [
            { id: 'image1', src: 'imgs/rodada1_img1.png', correctSection: 'section1' },
            { id: 'image2', src: 'imgs/rodada1_img2.png', correctSection: 'section2' },
            { id: 'image3', src: 'imgs/rodada1_img3.png', correctSection: 'section3' },
        ],
        sections: [
            { id: 'section1', text: 'Texto da história 1 - Rodada 1' },
            { id: 'section2', text: 'Texto da história 2 - Rodada 1' },
            { id: 'section3', text: 'Texto da história 3 - Rodada 1' },
        ]
    },
    {
        images: [
            { id: 'image1', src: 'imgs/rodada2_img1.png', correctSection: 'section1' },
            { id: 'image2', src: 'imgs/rodada2_img2.png', correctSection: 'section2' },
            { id: 'image3', src: 'imgs/rodada2_img3.png', correctSection: 'section3' },
        ],
        sections: [
            { id: 'section1', text: 'Texto da história 1 - Rodada 2' },
            { id: 'section2', text: 'Texto da história 2 - Rodada 2' },
            { id: 'section3', text: 'Texto da história 3 - Rodada 2' },
        ]
    },
];

initializeGame();

// Função de inicialização do jogo
function initializeGame() {
    currentRound = 0;
    loadRound();
}

// Função para carregar a rodada atual
function loadRound() {
    const roundData = rounds[currentRound];

    // Limpa imagens e textos anteriores
    imagesContainer.innerHTML = '';
    storySections.forEach((section, index) => {
        section.innerHTML = `<h2>Seção ${index + 1}</h2><p>${roundData.sections[index].text}</p>`;
        section.setAttribute('data-correct', roundData.sections[index].id);
    });

    // Carrega novas imagens
    roundData.images.forEach(imageData => {
        const imgElement = document.createElement('img');
        imgElement.id = imageData.id;
        imgElement.src = imageData.src;
        imgElement.classList.add('draggable');
        imgElement.setAttribute('draggable', 'true');
        imagesContainer.appendChild(imgElement);
        imgElement.addEventListener('dragstart', dragStart);
    });

    correctCount = 0;
    result.textContent = '';
}

// Funções de drag and drop
function dragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function dragOver(event) {
    event.preventDefault();
}

function dropImage(event) {
    event.preventDefault();
    const imageId = event.dataTransfer.getData('text');
    const draggedImage = document.getElementById(imageId);

    if (event.target.classList.contains('story-section')) {
        const correctSection = rounds[currentRound].images.find(img => img.id === imageId).correctSection;

        if (event.target.getAttribute('data-correct') === correctSection) {
            event.target.appendChild(draggedImage);
            correctCount++;
            if (correctCount === 3) {
                displayResult('Você acertou todas as imagens! Próxima rodada disponível.', 'green');
                showNextRoundButton();
            }
        } else {
            displayResult('Está incorreto. Tente novamente!', 'red');
        }
    }
}

function displayResult(message, color) {
    result.textContent = message;
    result.style.color = color;
}

function showNextRoundButton() {
    nextRoundButton.textContent = 'Próxima Rodada';
    nextRoundButton.style.display = 'inline-block';
    nextRoundButton.style.padding = '10px 20px';
    nextRoundButton.style.border = 'none';
    nextRoundButton.style.backgroundColor = '#28a745';
    nextRoundButton.style.color = '#fff';
    nextRoundButton.style.cursor = 'pointer';
    nextRoundButton.style.fontSize = '16px';
    nextRoundButton.style.borderRadius = '5px';
    nextRoundButton.onclick = goToNextRound;
    document.body.appendChild(nextRoundButton);
}

function goToNextRound() {
    if (currentRound < rounds.length - 1) {
        currentRound++;
        loadRound();
        nextRoundButton.style.display = 'none';
    } else {
        displayResult('Parabéns! Você completou todas as rodadas!', 'blue');
    }
}

// Eventos de arrastar e soltar para seções da história
storySections.forEach(section => {
    section.addEventListener('dragover', dragOver);
    section.addEventListener('drop', dropImage);
});
