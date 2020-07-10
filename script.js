// variables
const container = document.querySelector('div#container');
const clearBtn = document.querySelector('input#clearbtn');
const blackBtn = document.querySelector('input#blackbtn');
const colorfulBtn = document.querySelector('input#colorfulbtn');
const sprayBtn = document.querySelector('input#spraybtn');
// sketchColor must be a function
let sketchColor = () => {
    return '#222';
};
const initialGridSize = 24; // default size here
let gridSize = initialGridSize;
updateGridTemplate(); // need this if ever change the default grid size
appendItems(); // initial appendItems must be here
let items = document.querySelectorAll('div.item');

// event listeners
addMouseoverEventListeners();

clearBtn.addEventListener('click', () => {
    promptGridSize();
    removeItems(); // remove all divs in container
    updateGridTemplate();
    appendItems(); // reappend divs in container with new grid size
    clearGrid();
    addMouseoverEventListeners();
});

blackBtn.addEventListener('click', () => {
    sketchColor = () => {
        return '#222';
    };
});

colorfulBtn.addEventListener('click', () => {
    sketchColor = () => {
        const color = `rgb(${getRandomUpTo(256)}, ` +
        `${getRandomUpTo(256)}, ` +
        `${getRandomUpTo(256)})`;
        return color;
    };
});

sprayBtn.addEventListener('click', () => {
    sketchColor = () => {
        return 'spray';
    };
});

// functions

function addMouseoverEventListeners() {
    items.forEach((item) => {
        let darkness = 1;
        item.addEventListener('mouseover', () => {
            if (sketchColor() === 'spray') {
                if (darkness > 0.2) darkness -= 0.12;
                item.style.backgroundColor = 
                    `rgb(${Math.floor(darkness * 255)}, ` +
                    `${Math.floor(darkness * 255)}, ` +
                    `${Math.floor(darkness * 255)})`;
            } else {
                item.style.backgroundColor = sketchColor();
            }
        });
    });
}

function promptGridSize() {
    gridSize = +prompt('Enter grid size:', initialGridSize);
    while (!checkPositiveInt(gridSize)) {
        gridSize = +prompt('Enter grid size:', initialGridSize);
    }
}

function removeItems() {
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
    items = document.querySelectorAll('div.item');
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

function getRandomUpTo(num) {
    return Math.floor(Math.random() * 256);
}
