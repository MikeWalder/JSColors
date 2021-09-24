const mainTitle = document.querySelector('h1');
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
    const totalHue = (360 * total * (712 / 710) / (divX + divY)).toPrecision(4);
    const saturationX = 100 * (x - eltInfos.x) / divX;

    const elemColored = document.createElement('div');
    
    elt.appendChild(elemColored);
    
    elemColored.classList.add('colored');
    const visualColored = document.querySelectorAll('#rectangle .colored');
    let tabVisualColored = [...visualColored];
    
    elemColored.style.left = (x - 5)+"px";
    elemColored.style.top = (y - 5)+"px";
    elemColored.style.backgroundColor=`hsl(${totalHue}, ${saturationX}%, 50%)`;

    /* Ajout d'une div dans l'article contenant la couleur sélectionnée
    dans la palette, le rgb correspondant et l'icône de suppression de la div */
    const divRgbTexted = document.createElement('div');
    const renderRgbTexted = document.createElement('input');
    const fontDelete = document.createElement('i');
    const rgbTexted = document.createElement('label');
    
    article.appendChild(divRgbTexted);
    divRgbTexted.appendChild(renderRgbTexted);
    divRgbTexted.appendChild(fontDelete);
    divRgbTexted.appendChild(rgbTexted);

    divRgbTexted.classList.add(`tabColor${k}`);
    fontDelete.classList.add(`deleting${k}`);

    // Ajout de l'icône trash de font awesome
    fontDelete.classList.add('fas');
    fontDelete.classList.add('fa-trash-alt');

    renderRgbTexted.classList.add('inputedColor');
    renderRgbTexted.style.backgroundColor = `${inputColor.style.backgroundColor}`;
    rgbTexted.innerHTML = `${k+1}) ${inputColor.style.backgroundColor}`;
    k++;
    
    // traitement de chaque div dans un tableau pour traiter le cas de la suppression
    divColored = document.querySelectorAll('article div');
    let tabColored = [...divColored];

    // Gestion de la suppression de chaque div dans article
    for(let j = 0; j < tabColored.length; j++) {
        tabColored[j].addEventListener('click', function() {
            this.remove();; // suppression de la div 
            tabVisualColored[j].remove(); // Suppression du cercle de couleur correspondant à la div supprimée
        })
    }
})
