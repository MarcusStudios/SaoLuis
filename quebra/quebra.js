const pieces = document.querySelectorAll('.piece');
const dropZones = document.querySelectorAll('.drop-zone');

// Adiciona os eventos de drag and drop
pieces.forEach(piece => {
    piece.addEventListener('dragstart', dragStart);
});

dropZones.forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('drop', dropPiece);
});

function dragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function dragOver(event) {
    event.preventDefault();
}

function dropPiece(event) {
    event.preventDefault();
    const pieceId = event.dataTransfer.getData('text');
    const piece = document.getElementById(pieceId);
    
    // Verifica se a peça solta está no local correto
    if (event.target.getAttribute('data-correct') === pieceId) {
        event.target.appendChild(piece);
        piece.draggable = false; // Impede que a peça seja movida novamente
        piece.style.cursor = 'default';
    }
}
