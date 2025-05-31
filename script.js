let paintColor = 'black';
let previousColor = 'white';
let defaultGridSize = 16;
let randomMode = false;
let isMouseDown = false;
let shadingMode = false;
let eraseMode = false;

const gridContainer = document.querySelector('.picture-frame');

// Following two lines are used to keep state of mouse click
// within the drawing so that user can drag and draw
gridContainer.onmousedown = () => (isMouseDown = true);
gridContainer.onmouseup = () => (isMouseDown = false);


/**
 * Generates the grid for the drawing
 * @param {number} gridSize Size of the grid
 */
function populateGrid(gridSize) {
    gridContainer.innerHTML = '';

    for (let i = 0; i < gridSize; i++) {
        const gridRow = document.createElement('div');
        gridRow.style.width = '100%';
        gridRow.setAttribute("class", "flex");
        gridRow.style.display = 'flex';
        gridRow.style.flexDirection = 'row';

        for (let j = 0; j < gridSize; j++) {
            const pixel = document.createElement('div');
            pixel.style.border = 'solid 0.5px black';
            pixel.style.flex = 'auto';
            pixel.style.aspectRatio = '1/1';
            pixel.addEventListener('mousedown', changeColor);
            pixel.addEventListener('mouseover', changeColor);
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
function changeColor(e) {
    if (e.type === 'mouseover' && !isMouseDown) return;
    if (randomMode) {
        paintColor = generateRandomColor();
    }
    e.target.style.backgroundColor = paintColor;
}


const buttons = document.querySelector('.buttons');

buttons.addEventListener('click', (e) => {
    const button = e.target;

    switch (button.id) {
        case 'random':
            randomMode = !randomMode;
            if (randomMode) {
                button.style.backgroundColor = 'rgb(90, 255, 75)';
            } else {
                button.style.backgroundColor = '#EFEFEF';
                paintColor = 'black';
            }
            break;
        case 'shading':
            shadingMode = !shadingMode;
            if (shadingMode) {
                button.style.backgroundColor = 'rgb(90, 255, 75)'
            } else {
                button.style.backgroundColor = '#EFEFEF';
            }
            break;
        case 'eraser':
            eraseMode = !eraseMode;
            [paintColor, previousColor] = [previousColor, paintColor];
            if (eraseMode) {
                button.style.backgroundColor = 'rgb(90, 255, 75)';
            } else {
                button.style.backgroundColor = '#EFEFEF';
            }
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
})


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