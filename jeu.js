//===========================CHRONOPMETRE =============================
// initialisation des variables
let min = 0;
let sec = 0;
let afficher;
let compteur;
let reglage;

// affichage du compteur à 0
document.querySelector('.chrono').innerHTML = "0" + min + ":" + "0" + sec;

function chrono() {
    reglage = setTimeout(function () {
        sec++;
        if (sec > 59) {
            sec = 0;
            min++;
        }

        afficher = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
        document.querySelector(".chrono").innerHTML = afficher;

        chrono(); // appel récursif pour continuer le chronomètre
    }, 1000);
}

function debut() {
    // Activation et désactivation des boutons
    document.parametre.lance.disabled = "disabled";
    document.parametre.pause.disabled = "";
    document.parametre.zero.disabled = "";

}

function arret() {
    clearTimeout(reglage);
    document.parametre.lance.disabled = "";
    document.parametre.pause.disabled = "disabled";
    document.parametre.zero.disabled = "";

}

function raz() {
    clearTimeout(reglage);
    document.parametre.zero.disabled = "disabled";

    min = 0;
    sec = 0;
    compteur = "aucun temps intermédiaire enregistré";
    afficher = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
    document.querySelector(".chrono").innerHTML = afficher;
}

//===========================grille =============================
function genererStyles(joueurs) {
    let styles = '';

    joueurs.forEach((joueur) => {
        styles += `
                .${joueur} {
                    background-image: url("image/${joueur}.png");
                }

                .${joueur}hover {
                    background-image: url("image/${joueur}hover.png");
                }
            `;
    });

    // Injecter les règles CSS dans la balise <style>
    const styleElement = document.getElementById('dynamicStyles');
    styleElement.innerHTML = styles;
}


const grille = document.querySelector('.containerGrid');
let boutton_next_turn = document.getElementById('nextTurn')

function creerGrille(nb_col, nb_row) {
    // Efface le contenu actuel de la grille
    grille.innerHTML = '';

    // Définir le style de la grille
    grille.style.display = 'grid';
    grille.style.gridAutoColumns = '1fr';
    grille.style.gridTemplateColumns = `repeat(${nb_col}, 1fr)`;
    grille.style.gridTemplateRows = `repeat(${nb_row}, 1fr)`;
    grille.style.gap = '0px 0px';

    // Créer les cellules de la grille
    for (let i = 0; i < nb_row; i++) {
        for (let j = 0; j < nb_col; j++) {
            const cellule = document.createElement('div');
            cellule.classList.add('centered', 'grilleCell');

            // Ajouter une classe spéciale aux cellules du bord
            if (i === 0) cellule.classList.add('topBorder');
            if (i === nb_row - 1) cellule.classList.add('bottomBorder');
            if (j === 0) cellule.classList.add('leftBorder');
            if (j === nb_col - 1) cellule.classList.add('rightBorder');

            cellule.classList.add(`${i + 1}-${j + 1}`); // Texte à l'intérieur de la cellule
            grille.appendChild(cellule);
        }
    }
}


function jouer(liste) {
    console.log(liste)
    const pionJ = liste[0]
    console.log('point actif',pionJ)
    grille.style.pointerEvents = 'auto'
    cellules.forEach((cellule) => {
        cellule.addEventListener("mouseover", () => {cellule.classList.toggle(pionJ + 'hover')})
        cellule.addEventListener("mouseout", () => {cellule.classList.toggle(pionJ + 'hover')})

        cellule.addEventListener("click", () => {
            cellule.classList.add(pionJ)
            grille.style.pointerEvents = 'none'
            cellule.style.pointerEvents = 'none'
            console.log(liste)
            liste.push(liste.shift())
            console.log(liste)
            return setTimeout(() => {
                jouer(liste)
            }, 2000)


        })
    })
}



// Appeler la fonction pour initialiser la grille
let joueurs = ['pion1', 'pion2']
genererStyles(joueurs)
let nb_col = 3;
let nb_row = 3;
creerGrille(nb_col, nb_row);
let cellules = document.querySelectorAll('.grilleCell')
jouer(joueurs)
