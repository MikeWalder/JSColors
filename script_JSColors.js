const elt = document.querySelector('#rectangle');
const inputColor = document.querySelector('#render');
const colorRender = document.querySelector('#colorRender');
const article = document.querySelector('article');
let divColored = document.querySelectorAll('article div');

const eltInfos = elt.getBoundingClientRect();
let k = 0;
let tabColoredDiv = [];

//Gestion de la palette (cadre)
elt.addEventListener('mousemove', function(e) {
    const x = e.clientX; // Coordonnée X de la souris dans l'élément
    const y = e.clientY; // Coordonnée Y de la souris dans l'élément
    
    const divX = elt.offsetWidth; // Largeur totale de l'élément
    const divY = elt.offsetHeight; // Longueur totale de l'élément

    const total = (x - eltInfos.x + y - eltInfos.y).toPrecision(4);
    const totalHue = (360 *total * (712 / 710) / (divX + divY)).toPrecision(4);
    const saturationX = 100 * (x - eltInfos.x) / divX;
    
    inputColor.style.backgroundColor = `hsl(${totalHue}, ${saturationX}%, 50%)`;
    colorRender.innerHTML = `${inputColor.style.backgroundColor}`;
});

// Ajout d'éléments au DOM au clic sur la palette
elt.addEventListener('click', function(e) {
    const x = e.clientX;
    const y = e.clientY; 

    const divX = elt.offsetWidth; 
    const divY = elt.offsetHeight; 

    const total = (x - eltInfos.x + y - eltInfos.y).toPrecision(4);
    const totalHue = (360 *total * (712 / 710) / (divX + divY)).toPrecision(4);
    const saturationX = 100 * (x - eltInfos.x) / divX;

    const elemColored = document.createElement('div');
    
    elt.appendChild(elemColored);

    elemColored.classList.add('colored');
    elemColored.style.left = (x - 5)+"px";
    elemColored.style.top = (y - 5)+"px";
    
    elemColored.style.backgroundColor=`hsl(${totalHue}, ${saturationX}%, 50%)`;
    elemColored.style.transition = 'background-color 3s ease';

    const divRgbTexted = document.createElement('div');
    const rgbTexted = document.createElement('label');
    const renderRgbTexted = document.createElement('input');
    
    article.appendChild(divRgbTexted);
    divRgbTexted.appendChild(renderRgbTexted);
    divRgbTexted.appendChild(rgbTexted);
    
    divRgbTexted.classList.add(`tabColor${k}`);
    divRgbTexted.title="Cliquez pour supprimer";

    renderRgbTexted.classList.add('inputedColor');
    renderRgbTexted.style.backgroundColor = `${inputColor.style.backgroundColor}`;
    rgbTexted.innerHTML = `${k+1}) ${inputColor.style.backgroundColor}`;
    k++;
    
    divColored = document.querySelectorAll('article div');
    let tabColored = [...divColored];

    for(let j = 0; j < tabColored.length; j++) {
        tabColored[j].addEventListener('click', function() {
            this.innerHTML = ""; // suppression fictive de l'élément à supprimer
            tabColored.splice(this, 1);
        })
    }
})


/* Améliorations prochaine version : 

1) Ajouter des animations simples
2) Supprimer du DOM la div sélectionnée dans <article> 
3) Ajouter Un bouton "supprimer" en favicon remplaçant le title au hover de chaque label

*/