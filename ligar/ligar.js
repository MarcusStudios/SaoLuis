const images = document.querySelectorAll('.draggable');
const sections = document.querySelectorAll('.story-section');
const result = document.getElementById('result');

// Adiciona os eventos de drag and drop nas imagens e nas seções
images.forEach(image => {
    image.addEventListener('dragstart', dragStart);
});

sections.forEach(section => {
    section.addEventListener('dragover', dragOver);
    section.addEventListener('drop', dropImage);
});

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

    // Verifica se a imagem está correta para a seção
    if (event.target.getAttribute('data-correct') === imageId) {
        event.target.appendChild(draggedImage);
        result.textContent = 'Você acertou!';
        result.style.color = 'green';
    } else {
        result.textContent = 'Está incorreto. Tente novamente!';
        result.style.color = 'red';
    }
}
