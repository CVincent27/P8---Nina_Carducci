// Fonction principale du plugin mauGallery
const mauGallery = function(selector, options) {
  // Options par défaut
  const defaults = {
    columns: 3,
    lightBox: true,
    lightboxId: null,
    showTags: true,
    tagsPosition: 'bottom',
    navigation: true
  };

  // Fusionner les options par défaut avec celles fournies par l'utilisateur
  options = { ...defaults, ...options };

  // Sélection des éléments correspondant au sélecteur
  const galleryElements = document.querySelectorAll(selector);

  // Pour chaque élément correspondant, appliquer le plugin
  galleryElements.forEach(function(gallery) {
    createRowWrapper(gallery);

    if (options.lightBox) {
      createLightBox(gallery, options.lightboxId, options.navigation);
    }

    // Ajout des écouteurs d'événements
    gallery.addEventListener('click', function(event) {
      const galleryItem = event.target.closest('.gallery-item');
      if (galleryItem && galleryItem.tagName === 'IMG' && options.lightBox) {
        openLightBox(galleryItem, options.lightboxId);
      }
    });

    // Sélection des items de galerie
    gallery.querySelectorAll('.gallery-item').forEach(function(item) {
      responsiveImageItem(item);
      moveItemInRowWrapper(item);
      wrapItemInColumn(item, options.columns);

      const theTag = item.dataset.galleryTag;
      if (options.showTags && theTag !== undefined && !tagsCollection.includes(theTag)) {
        tagsCollection.push(theTag);
      }
    });

    // Afficher les tags si nécessaire
    if (options.showTags) {
      showItemTags(gallery, options.tagsPosition, tagsCollection);
    }

    // Animation de fadeIn pour chaque galerie
    gallery.style.display = 'block';
    gallery.style.opacity = 0;
    fadeIn(gallery, 500);
  });

  // Fonction pour créer un wrapper de ligne
  function createRowWrapper(element) {
    if (!element.querySelector('.row')) {
      const rowWrapper = document.createElement('div');
      rowWrapper.classList.add('gallery-items-row', 'row');
      element.appendChild(rowWrapper);
    }
  }

  // Fonction pour envelopper un élément dans une colonne
  function wrapItemInColumn(element, columns) {
    let columnClasses = '';
    if (typeof columns === 'number') {
      columnClasses = `col-${Math.ceil(12 / columns)}`;
    } else if (typeof columns === 'object') {
      for (let breakpoint in columns) {
        if (columns.hasOwnProperty(breakpoint)) {
          columnClasses += ` col-${breakpoint}-${Math.ceil(12 / columns[breakpoint])}`;
        }
      }
    } else {
      console.error(`Columns should be defined as numbers or objects. ${typeof columns} is not supported.`);
      return;
    }

    const columnWrapper = document.createElement('div');
    columnWrapper.classList.add('item-column', 'mb-4', columnClasses);
    element.appendChild(columnWrapper);
    columnWrapper.appendChild(element);
  }

  // Fonction pour déplacer l'élément dans le wrapper de ligne
  function moveItemInRowWrapper(element) {
    const rowWrapper = element.closest('.gallery-items-row');
    if (rowWrapper) {
      rowWrapper.appendChild(element);
    }
  }

  // Fonction pour ajouter la classe img-fluid pour les images
  function responsiveImageItem(element) {
    if (element.tagName === 'IMG') {
      element.classList.add('img-fluid');
    }
  }

  // Fonction pour ouvrir la lightbox
  function openLightBox(element, lightboxId) {
    const lightboxImage = document.querySelector(`#${lightboxId} .lightboxImage`);
    if (lightboxImage) {
      lightboxImage.setAttribute('src', element.getAttribute('src'));
      document.querySelector(`#${lightboxId}`).classList.toggle('show');
    }
  }

  // Fonction pour créer la lightbox
  function createLightBox(gallery, lightboxId, navigation) {
    const lightboxHTML = `
      <div class="modal fade" id="${lightboxId ? lightboxId : 'galleryLightbox'}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              ${navigation ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;">&lt;</div>' : ''}
              <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
              ${navigation ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;">&gt;</div>' : ''}
            </div>
          </div>
        </div>
      </div>`;
    gallery.insertAdjacentHTML('beforeend', lightboxHTML);
  }

  // Fonction pour afficher les tags d'élément
  function showItemTags(gallery, position, tags) {
    let tagItems = `
      <li class="nav-item"><span class="nav-link active active-tag" data-images-toggle="all">Tous</span></li>`;

    tags.forEach(function(tag) {
      tagItems += `
        <li class="nav-item active">
          <span class="nav-link" data-images-toggle="${tag}">${tag}</span>
        </li>`;
    });

    const tagsRow = `
      <ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;

    if (position === 'bottom') {
      gallery.insertAdjacentHTML('beforeend', tagsRow);
    } else if (position === 'top') {
      gallery.insertAdjacentHTML('afterbegin', tagsRow);
    } else {
      console.error(`Unknown tags position: ${position}`);
    }
  }

  // Fonction pour l'effet fadeIn
  function fadeIn(element, duration) {
    let opacity = 0;
    const interval = 16; // 16ms interval ~ 60fps
    const increment = interval / duration;
    const fadeEffect = setInterval(function() {
      opacity += increment;
      element.style.opacity = opacity;
      if (opacity >= 1) {
        clearInterval(fadeEffect);
      }
    }, interval);
  }
};
