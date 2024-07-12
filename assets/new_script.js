document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-inner');
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
    let currentIndex = 0;
    const intervalTime = 5000; // Temps en millisecondes entre chaque changement d'image

    // Fonction pour afficher une image spécifique dans le carrousel
    function goToSlide(index) {
        if (index < 0 || index >= totalItems) return; // Vérifier les limites

        // Désactiver l'élément actuel
        carouselItems[currentIndex].classList.remove('active');

        // Mettre à jour l'index actuel
        currentIndex = index;

        // Activer le nouvel élément
        carouselItems[currentIndex].classList.add('active');

        // Mettre à jour l'indicateur actuel
        updateIndicators();
    }

    // Fonction pour mettre à jour les indicateurs
    function updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicators button');
        indicators.forEach((button, index) => {
            if (index === currentIndex) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Écouter les clics sur les boutons de l'indicateur
    const indicators = document.querySelectorAll('.carousel-indicators button');
    indicators.forEach((button, index) => {
        button.addEventListener('click', function() {
            goToSlide(index);
        });
    });

    // Fonction pour afficher l'image suivante dans le carrousel
    function nextSlide() {
        goToSlide((currentIndex + 1) % totalItems);
    }

    // Fonction pour afficher l'image précédente dans le carrousel
    function prevSlide() {
        goToSlide((currentIndex - 1 + totalItems) % totalItems);
    }

    // Écouter les clics sur le bouton précédent
    document.querySelector('.carousel-prev').addEventListener('click', prevSlide);

    // Écouter les clics sur le bouton suivant
    document.querySelector('.carousel-next').addEventListener('click', nextSlide);

    // Mettre à jour l'indicateur automatiquement toutes les intervalTime millisecondes
    setInterval(nextSlide, intervalTime);
});
