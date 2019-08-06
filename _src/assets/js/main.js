'use strict';

const paletteContainer = document.querySelector('.palettes');

const endpoint = 'https://raw.githubusercontent.com/Adalab/Easley-ejercicios-de-fin-de-semana/master/data/palette.json';

function getPalettes() {
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {

      let itemColors = '';
      const itemName = data.palettes[0].name;

      for (const color of data.palettes[0].colors) {
        itemColors += `
          <li class="palette__color" style="background-color:#${color}">#${color}</li>
        `;
      }

      paletteContainer.innerHTML = `
        <li class="palette">
          <h2 class="palette__name">${itemName}</h2>
          <ul class="palette__colors">
            ${itemColors}
          </ul>
        </li>
      `;
    });
}

getPalettes();
