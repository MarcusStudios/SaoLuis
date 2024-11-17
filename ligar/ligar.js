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
    // Outras rodadas seguem a mesma estrutura
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
        imgElement.addEventListener('touchstart', dragStart);
        imgElement.addEventListener('mousedown', dragStart);  // Para dispositivos desktop
    });

    correctCount = 0;
    result.textContent = '';
}

// Funções de drag and drop (para dispositivos móveis e desktop)
let draggedImage = null;

function dragStart(event) {
    // Previne o comportamento padrão
    event.preventDefault();
    // Se for no touch (móvel), armazena a posição inicial do toque
    if (event.type === 'touchstart') {
        const touch = event.touches[0];
        draggedImage = event.target;
        draggedImage.style.position = 'absolute';
        draggedImage.style.zIndex = 10;  // Coloca a imagem acima das outras
        draggedImage.style.left = `${touch.pageX - draggedImage.width / 2}px`;
        draggedImage.style.top = `${touch.pageY - draggedImage.height / 2}px`;
    } else {
        draggedImage = event.target;
        draggedImage.style.position = 'absolute';
        draggedImage.style.zIndex = 10;
        draggedImage.style.left = `${event.pageX - draggedImage.width / 2}px`;
        draggedImage.style.top = `${event.pageY - draggedImage.height / 2}px`;
    }

    // Adiciona os eventos para mover a imagem
    document.addEventListener('touchmove', dragMove);
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('touchend', dragEnd);
    document.addEventListener('mouseup', dragEnd);
}

function dragMove(event) {
    // Move a imagem para a posição do toque ou do mouse
    if (draggedImage) {
        let x, y;
        if (event.type === 'touchmove') {
            const touch = event.touches[0];
            x = touch.pageX - draggedImage.width / 2;
            y = touch.pageY - draggedImage.height / 2;
        } else {
            x = event.pageX - draggedImage.width / 2;
            y = event.pageY - draggedImage.height / 2;
        }

        draggedImage.style.left = `${x}px`;
        draggedImage.style.top = `${y}px`;
    }
}

function dragEnd(event) {
    // Verifica se a imagem foi solta em uma seção válida
    if (draggedImage) {
        let targetSection = null;
        storySections.forEach(section => {
            const sectionRect = section.getBoundingClientRect();
            const imageRect = draggedImage.getBoundingClientRect();
            if (
                imageRect.right > sectionRect.left &&
                imageRect.left < sectionRect.right &&
                imageRect.bottom > sectionRect.top &&
                imageRect.top < sectionRect.bottom
            ) {
                targetSection = section;
            }
        });

        if (targetSection) {
            const correctSection = rounds[currentRound].images.find(img => img.id === draggedImage.id).correctSection;
            if (targetSection.getAttribute('data-correct') === correctSection) {
                targetSection.appendChild(draggedImage);
                correctCount++;
                if (correctCount === 3) {
                    displayResult('Você acertou todas as imagens! Próxima rodada disponível.', 'green');
                    showNextRoundButton();
                }
            } else {
                displayResult('Está incorreto. Tente novamente!', 'red');
            }
        }

        // Remove os eventos de movimento e finalização
        document.removeEventListener('touchmove', dragMove);
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('touchend', dragEnd);
        document.removeEventListener('mouseup', dragEnd);
        draggedImage = null;
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
    nextRoundButton.style.position = 'relative';
    nextRoundButton.style.top = '20px';
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

// Eventos de arrastar e soltar para seções da história
storySections.forEach(section => {
    section.addEventListener('touchmove', dragOver);
    section.addEventListener('mousemove', dragOver);
    section.addEventListener('touchend', dropImage);
    section.addEventListener('mouseup', dropImage);
});

function dragOver(event) {
    event.preventDefault();
}

function dropImage(event) {
    event.preventDefault();
    // Código para finalizar o drop da imagem
}
