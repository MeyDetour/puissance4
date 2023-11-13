let play = document.querySelector('[data-label="play-game"]');
let settings = document.querySelector('[data-label="settings"]');


//ANIMATION FOND
document.addEventListener('DOMContentLoaded', function () {
    const circlesContainer = document.getElementById('circlesContainer');
    const numberOfCircles = 35;

    function createInitialCircles() {
        for (let i = 0; i < numberOfCircles; i++) {
            createCircle();
        }
    }

    function createCircle() {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.left = `${Math.random() * 100}vw`;
        circle.style.top = `${Math.random() * 100}vh`;

        circlesContainer.appendChild(circle);

        // Applique la classe 'move' pour déclencher la transition
        setTimeout(() => {
            circle.classList.add('move');
        }, 100);
    }

    function moveCircles() {
        const circles = document.querySelectorAll('.circle');

        circles.forEach(circle => {
            const currentTransform = circle.style.transform || 'translate(0px, 0px)';
            const currentX = parseFloat(currentTransform.match(/translate\(([-\d.]+)px, [-\d.]+px\)/)[1]);
            const currentY = parseFloat(currentTransform.match(/translate\([-?\d.]+px, ([-\d.]+)px\)/)[1]);

            const moveX = Math.random() * 80 - 40; // Déplacement aléatoire entre -25px et 25px en x
            const moveY = Math.random() * 80 - 40; // Déplacement aléatoire entre -25px et 25px en y

            const newX = currentX + moveX;
            const newY = currentY + moveY;

            // Applique la transformation pour déplacer le cercle
            circle.style.transform = `translate(${newX}px, ${newY}px)`;
        });
    }

    function createAndMoveCircles() {
        createInitialCircles();
        setInterval(() => {
            moveCircles();
            // Crée huit nouveaux cercles toutes les 5 secondes
            for (let i = 0; i < 2; i++) {
                createCircle();
            }
        }, 100000);
        setInterval(moveCircles, 1000); // Déplace les cercles toutes les 2 secondes
    }

    createAndMoveCircles();
});
