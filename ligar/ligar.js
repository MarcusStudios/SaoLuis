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
            { id: 'image1', src: './imgs/Mula_sem_cabe_a_em_Voc__Sabia_-_Folclore.png', correctSection: 'section1' },
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
    {
        images: [
            { id: 'image1', src: 'imgs/rodada3_img1.png', correctSection: 'section1' },
            { id: 'image2', src: 'imgs/rodada3_img2.png', correctSection: 'section2' },
            { id: 'image3', src: 'imgs/rodada3_img3.png', correctSection: 'section3' },
        ],
        sections: [
            { id: 'section1', text: 'Texto da história 1 - Rodada 3' },
            { id: 'section2', text: 'Texto da história 2 - Rodada 3' },
            { id: 'section3', text: 'Texto da história 3 - Rodada 3' },
        ]
    },
    {
        images: [
            { id: 'image1', src: 'imgs/rodada4_img1.png', correctSection: 'section1' },
            { id: 'image2', src: 'imgs/rodada4_img2.png', correctSection: 'section2' },
            { id: 'image3', src: 'imgs/rodada4_img3.png', correctSection: 'section3' },
        ],
        sections: [
            { id: 'section1', text: 'Texto da história 1 - Rodada 4' },
            { id: 'section2', text: 'Texto da história 2 - Rodada 4' },
            { id: 'section3', text: 'Texto da história 3 - Rodada 4' },
        ]
    },
    {
        images: [
            { id: 'image1', src: 'imgs/rodada5_img1.png', correctSection: 'section1' },
            { id: 'image2', src: 'imgs/rodada5_img2.png', correctSection: 'section2' },
            { id: 'image3', src: 'imgs/rodada5_img3.png', correctSection: 'section3' },
        ],
        sections: [
            { id: 'section1', text: 'Texto da história 1 - Rodada 5' },
            { id: 'section2', text: 'Texto da história 2 - Rodada 5' },
            { id: 'section3', text: 'Texto da história 3 - Rodada 5' },
        ]
    }
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
        imgElement.addEventListener('touchstart', touchStart);
        imgElement.addEventListener('touchmove', touchMove);
        imgElement.addEventListener('touchend', touchEnd);
    });

    correctCount = 0;
    result.textContent = '';
}

// Funções de drag and drop (mouse)
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

// Funções de touch (para toque na tela)
let touchStartX = 0;
let touchStartY = 0;

function touchStart(event) {
    const touch = event.touches[0]; // Captura o primeiro toque
    touchStartX = touch.pageX;
    touchStartY = touch.pageY;
    event.preventDefault(); // Previne o comportamento padrão para o toque
}

function touchMove(event) {
    const touch = event.touches[0]; // Captura o movimento do toque
    const deltaX = touch.pageX - touchStartX;
    const deltaY = touch.pageY - touchStartY;

    // Adiciona movimento suave da imagem durante o toque
    const imgElement = event.target;
    imgElement.style.position = 'absolute';
    imgElement.style.left = `${touch.pageX - imgElement.width / 2}px`;
    imgElement.style.top = `${touch.pageY - imgElement.height / 2}px`;

    event.preventDefault(); // Previne o comportamento padrão do movimento
}

function touchEnd(event) {
    const touch = event.changedTouches[0];
    const imgElement = event.target;
    imgElement.style.position = 'relative'; // Restaura o comportamento da imagem ao soltar

    // Verifica a posição do toque ao soltar
    const droppedOnSection = Array.from(storySections).find(section => {
        const rect = section.getBoundingClientRect();
        return touch.pageX >= rect.left && touch.pageX <= rect.right &&
               touch.pageY >= rect.top && touch.pageY <= rect.bottom;
    });

    if (droppedOnSection) {
        const correctSection = rounds[currentRound].images.find(img => img.id === imgElement.id).correctSection;
        if (droppedOnSection.getAttribute('data-correct') === correctSection) {
            droppedOnSection.appendChild(imgElement);
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

// Função para exibir o resultado
function displayResult(message, color) {
    result.textContent = message;
    result.style.color = color;
}

function showNextRoundButton() {
    nextRoundButton.textContent = 'Próxima Rodada';
    nextRoundButton.style.display = 'inline-block';
    nextRoundButton.style.padding = '10px 20px';
    nextRoundButton.style.border = 'none';
    nextRoundButton.style.position = 'relative';  // Adicionado para permitir o uso de "top"
    nextRoundButton.style.top = '20px';  // Agora o botão vai descer
    nextRoundButton.style.backgroundColor = 'black';
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

// Eventos de arrastar e soltar para seções da história (mouse)
storySections.forEach(section => {
    section.addEventListener('dragover', dragOver);
    section.addEventListener('drop', dropImage);
    section.addEventListener('touchstart', touchStart);
    section.addEventListener('touchmove', touchMove);
    section.addEventListener('touchend', touchEnd);
});