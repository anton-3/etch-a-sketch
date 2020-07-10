const container = document.querySelector('div#container');
let gridSize = 16;
appendItems();

const clearButton = document.querySelector('input#clear');
clearButton.addEventListener('click', () => {
    promptGridSize();
    removeItems(); // remove all divs in container
    updateGridTemplate();
    appendItems(); // reappend divs in container with new grid size
    clearGrid();
});

function promptGridSize() {
    gridSize = +prompt('Enter grid size:', '16');
    while (!checkPositiveInt(gridSize)) {
        gridSize = +prompt('Enter grid size:', '16');
    }
}

function removeItems() {
    const items = document.querySelectorAll('div.item');
    items.forEach((item) => {
        item.remove();
    });
}

function updateGridTemplate() {
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
}

function appendItems() {
    for (let i = 1; i <= gridSize ** 2; i++) {
        const item = document.createElement('div');
        item.classList = 'item';
        container.appendChild(item);
    }
}

function clearGrid() {
    const items = document.querySelectorAll('div.item');
    items.forEach((item) => {
        item.style.backgroundColor = 'white';
    });
}

function checkPositiveInt(num) {
    if (typeof num !== 'number') return false;
    if (num <= 0) return false;
    if (Math.floor(num) !== num) return false;
    return true;
}