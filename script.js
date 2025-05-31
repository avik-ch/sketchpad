let paintColor = 'black';
let defaultGridSize = 16;

let colorMode = true;
let randomMode = false;
let eraseMode = false;



const colorPicker = document.querySelector('input');
colorPicker.oninput = e => {
    paintColor = e.target.value;
    colorMode = true;
    randomMode = false;
    eraseMode = false;
};


// Following lines are used to keep state of mouse click
// within the drawing so that user can drag and draw
const gridContainer = document.querySelector('.picture-frame');
let isMouseDown = false;
gridContainer.onmousedown = () => (isMouseDown = true);
gridContainer.onmouseup = () => (isMouseDown = false);
gridContainer.addEventListener('dragstart', (e) => e.preventDefault());


/**
 * Generates the grid for the drawing
 * @param {number} gridSize Size of the grid
 */
function populateGrid(gridSize) {
    gridContainer.innerHTML = '';

    for (let i = 0; i < gridSize; i++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add("flex", "grid-row")

        for (let j = 0; j < gridSize; j++) {
            const pixel = document.createElement('div');
            pixel.classList.add("pixel");
            pixel.addEventListener('mousedown', paintPixel);
            pixel.addEventListener('mouseover', paintPixel);
            gridRow.appendChild(pixel);
        }
        gridContainer.appendChild(gridRow);
    }
}


/**
 * Fills individual pixel with color
 * @param {Event} e 
 * @returns None
 */
function paintPixel(e) {
    if (e.type === 'mouseover' && !isMouseDown) return;
    let colorToUse = paintColor;
    if (randomMode) {
        colorToUse = generateRandomColor();
    }
    if (eraseMode) {
        colorToUse = 'white';
    }
    e.target.style.backgroundColor = colorToUse;
}


// Event delegation to reduce number of listeners
const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', (e) => {
    const button = e.target;

    switch (button.id) {
        case 'random':
            randomMode = true;
            eraseMode = false;
            colorMode = false;
            break;
        case 'color':
            colorMode = true;
            randomMode = false;
            eraseMode = false;
            break;
        case 'eraser':
            eraseMode = true;
            randomMode = false;
            break;
        case 'clear':
            populateGrid(defaultGridSize);
            break;
        case 'change':
            let input = '';
            while (true) {
                input = prompt("Enter grid size [max 100]", defaultGridSize);
                if (input > 0 && input <= 100) {
                    break;
                }
            }
            defaultGridSize = input;
            populateGrid(input);
    }
});


/**
 * Generates a random RGB value string and returns it
 * @returns {string} rgb(r, g, b)
 */
function generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`
}

populateGrid(defaultGridSize);