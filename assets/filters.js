document.addEventListener("DOMContentLoaded", function() {
  const filters = document.querySelectorAll(".nav-link");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filters.forEach(filter => {
    filter.addEventListener("click", function() {
      // Supprimer la classe active de tous les filtres
      filters.forEach(f => f.classList.remove("active-filter"));
      // Ajouter la classe active uniquement au filtre sélectionné
      this.classList.add("active-filter");

      const filterTag = this.getAttribute("data-filter");
      galleryItems.forEach(item => {
        if (filterTag === "all") {
          item.style.display = "block";
        } else {
          if (item.getAttribute("data-gallery-tag") === filterTag) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        }
      });
    });
  });
});
