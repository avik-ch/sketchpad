function populateGrid(gridSize) {
    const gridContainer = document.querySelector('.picture-frame');
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
            gridRow.appendChild(pixel);
        }
        gridContainer.appendChild(gridRow);
    }

}

populateGrid(16);
populateGrid(16);