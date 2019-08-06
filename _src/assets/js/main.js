'use strict';

const paletteContainer = document.querySelector('.palettes');

const endpoint = 'https://raw.githubusercontent.com/Adalab/Easley-ejercicios-de-fin-de-semana/master/data/palettes.json';
const favs = [];

function handleFav(event) {
  const currentPalette = event.currentTarget;
  const currentPaletteName = currentPalette.getAttribute('data-name');

  currentPalette.classList.toggle('palette--is-favorite');
  if (currentPalette.classList.contains('palette--is-favorite') === true) {
    // añade el elemento al array de favoritos
    if (favs.includes(currentPaletteName) === false) {
      favs.push(currentPaletteName);
    }
  } else {
    // lo quitamos del array de favoritos
    const index = favs.indexOf(currentPaletteName);
    if (index > -1) {
      favs.splice(index, 1);
    }
  }
  // pintar el array para ver qué ha pasado
  console.log(favs);
}

function activateFavs() {
  const myPalettes = document.querySelectorAll('.palette');

  for (const item of myPalettes) {
    item.addEventListener('click', handleFav);
  }
}

function getPalettes() {
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      let paletteItem = '';
      for (const item of data.palettes) {
        let itemColors = '';

        for (const color of item.colors) {
          itemColors += `
            <li class="palette__color" style="background-color:#${color}">#${color}</li>
          `;
        }

        paletteItem += `
          <li class="palette" data-name="${item.name}">
            <h2 class="palette__name">${item.name} <small>(${item.from})</small></h2>
            <ul class="palette__colors">
              ${itemColors}
            </ul>
          </li>
        `;
      }
      paletteContainer.innerHTML = paletteItem;

      activateFavs();
    });
}

getPalettes();
