const header = document.getElementById("header");
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");
const video = document.getElementById("video-background");
const videoBtn = document.getElementById("video-btn");
const videoIcon = document.getElementById("video-icon");
const likeButtons = document.querySelectorAll('.like-btn');
const meteSection = document.querySelector('.mete_section');
const scrollTop = document.getElementById("scrolltop");

const likeCountMap = {};

// Funzione per incrementare il conteggio dei like
function incrementLikeCount(metaId) {
  if (likeCountMap[metaId] === undefined) {
    likeCountMap[metaId] = 0;
  }
  likeCountMap[metaId]++;
}

// Funzione per ottenere il conteggio dei like di una meta
function getLikeCount(metaId) {
  return likeCountMap[metaId] || 0;
}

// Funzione per aggiornare il conteggio dei like nella pagina
function updateLikeCountOnPage(metaId) {
  const likeCountElement = document.querySelector(`.like-count[data-meta-id="${metaId}"]`);
  likeCountElement.textContent = getLikeCount(metaId);
}

// Funzione per ordinare dinamicamente le mete in base al numero di like
function orderMeteByLikes() {
  const meteItems = Array.from(meteSection.getElementsByClassName('meta__item'));

  // Ordina gli elementi in base al conteggio dei like
  meteItems.sort((a, b) => {
    const likeCountA = getLikeCount(a.id);
    const likeCountB = getLikeCount(b.id);
    return likeCountB - likeCountA;
  });

  // Rimuovi gli elementi esistenti dal DOM
  meteItems.forEach(item => {
    meteSection.removeChild(item);
  });

  // Aggiungi gli elementi ordinati al DOM
  meteItems.forEach(item => {
    meteSection.appendChild(item);
  });
}

// Funzione per aggiornare la visualizzazione dei like nel DOM
function updateLikeView() {
  const meteItems = document.querySelectorAll('.meta__item');
  meteItems.forEach(item => {
    const metaId = item.id;
    updateLikeCountOnPage(metaId);
  });
}

// Event listener per lo scroll dell'header
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("header--scroll");
  } else {
    header.classList.remove("header--scroll");
  }
});

// Event listener per il click sul pulsante del menu di navigazione
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav__menu--open");
  changeIcon();
});

// Event listener per il click su ciascun collegamento di navigazione
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("nav__menu--open");
    changeIcon();
  });
});

// Event listener per attivare il link di navigazione con lo scroll
window.addEventListener("scroll", addActiveLink);

// Event listener per il click sul pulsante del video
videoBtn.addEventListener("click", playPauseVideo);

// Event listener per la fine del video
video.addEventListener("ended", () => {
  videoIcon.classList.replace("ri-pause-line", "ri-play-line");
});

// Event listener per il click su ciascun bottone Like
likeButtons.forEach(likeButton => {
  likeButton.addEventListener('click', handleLikeClick);
});

// Event listener per tornare su
window.addEventListener("scroll", showScrollTop);

// Event listener per ScrollReveal
const sr = ScrollReveal({
  distance: "100px",
  duration: 2000,
  delay: 400,
  reset: true,
});

// Rivelazione degli elementi con ScrollReveal
sr.reveal(".home__content, .how__item, .explore__item, .reservation__item, .blog__item, .testimonial__item, .footer__item, .meta__item",
  { interval: 100 });

// Funzione per cambiare l'icona del toggle di navigazione
function changeIcon() {
  if (navMenu.classList.contains("nav__menu--open")) {
    navToggle.classList.replace("ri-menu-add-line", "ri-close-line");
  } else {
    navToggle.classList.replace("ri-close-line", "ri-menu-add-line");
  }
}

// Funzione per attivare il link di navigazione con lo scroll
function addActiveLink() {
  const section = document.querySelectorAll("section[id]");
  section.forEach(section => {
    const scrollY = window.scrollY,
      sectionTop = section.offsetTop - 120,
      sectionHeight = section.offsetHeight,
      sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__link[href*='" + sectionId + "']")
        .classList.add("nav__link--active");
    } else {
      document
        .querySelector(".nav__link[href*='" + sectionId + "']")
        .classList.remove("nav__link--active");
    }
  });
}

// Funzione per mettere in play/pausa il video
function playPauseVideo() {
  if (video.paused) {
    video.play();
    videoIcon.classList.replace("ri-play-line", "ri-pause-line");
  } else {
    video.pause();
    videoIcon.classList.replace("ri-pause-line", "ri-play-line");
  }
}

// Funzione per gestire il click sul pulsante Like
function handleLikeClick() {
  const metaId = this.getAttribute('data-meta-id');
  incrementLikeCount(metaId);
  orderMeteByLikes();
  updateLikeView();
}

// Funzione per mostrare il pulsante "torna su"
function showScrollTop() {
  if (window.scrollY > 180) {
    scrollTop.classList.add("scrolltop--show");
  } else {
    scrollTop.classList.remove("scrolltop--show");
  }
}

// Chiama la funzione iniziale per ordinare le mete all'avvio della pagina
orderMeteByLikes();

