let slideIndex = 1;

const modal = document.getElementById("gallery-modal");
const modalImage = document.getElementById("modal-image");


function openModal(index) {
  modal.classList.add("active"); 
  slideIndex = index;
  showSlides(slideIndex);
}

// Fonction pour fermer la modal
function closeModal() {
  modal.classList.remove("active"); // Retire la classe "active" pour masquer la modal
}

// naviguer entre les diapo
function nextSlide(n) {
  showSlides(slideIndex += n);
}

//  afficher une diapositive spécifique
function showSlides(n) {
  const galleryItems = document.querySelectorAll(".gallery-item");

  // Si n dépasse le nombre total d'images, retourne à la première
  if (n > galleryItems.length) {
    slideIndex = 1;
  }
  // Si n est inférieur à 1, retourne à la dernière image
  if (n < 1) {
    slideIndex = galleryItems.length;
  }

  // Affiche l'image correspondant à slideIndex
  modalImage.src = galleryItems[slideIndex - 1].src;
}

