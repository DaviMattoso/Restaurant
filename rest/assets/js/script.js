'use strict'; // Activa el modo estricto de JavaScript para evitar errores comunes.

/**
 * PRELOAD
 * 
 * La carga termina cuando el documento está completamente cargado.
 */

const preloader = document.querySelector("[data-preaload]"); // Selecciona el elemento de precarga.

window.addEventListener("load", function () {
  preloader.classList.add("loaded"); // Agrega la clase "loaded" para ocultar el preloader.
  document.body.classList.add("loaded"); // Agrega la clase "loaded" al body.
});

/**
 * Añadir un event listener a múltiples elementos.
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback); // Agrega el evento a cada elemento.
  }
}

/**
 * NAVBAR (barra de nav)
 */

const navbar = document.querySelector("[data-navbar]"); // Selecciona la barra de navegación.
const navTogglers = document.querySelectorAll("[data-nav-toggler]"); // Selecciona los botones de alternar el menú.
const overlay = document.querySelector("[data-overlay]"); // Selecciona el overlay del menú.

const toggleNavbar = function () {
  navbar.classList.toggle("active"); // Alterna la visibilidad del navbar.
  overlay.classList.toggle("active"); // Alterna la visibilidad del overlay.
  document.body.classList.toggle("nav-active"); // Agrega o quita la clase de estado activo del menú.
}

addEventOnElements(navTogglers, "click", toggleNavbar); // Agrega el evento de clic para alternar el navbar.

/**
 * HEADER & BOTÓN DE VOLVER ARRIBA
 */

const header = document.querySelector("[data-header]"); // Selecciona el header.
const backTopBtn = document.querySelector("[data-back-top-btn]"); // Selecciona el botón de volver arriba.

let lastScrollPos = 0; // Almacena la última posición de desplazamiento.

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY; // Verifica si el usuario está bajando.
  if (isScrollBottom) {
    header.classList.add("hide"); // Oculta el header.
  } else {
    header.classList.remove("hide"); // Muestra el header.
  }

  lastScrollPos = window.scrollY; // Actualiza la última posición de scroll.
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) { // Si el scroll supera los 50px:
    header.classList.add("active"); // Agrega la clase "active" al header.
    backTopBtn.classList.add("active"); // Muestra el botón de volver arriba.
    hideHeader(); // Llama a la función para ocultar el header si es necesario.
  } else {
    header.classList.remove("active"); // Quita la clase "active" del header.
    backTopBtn.classList.remove("active"); // Oculta el botón de volver arriba.
  }
});

/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]"); // Selecciona el contenedor del slider.
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]"); // Selecciona los ítems del slider.
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]"); // Botón de slide anterior.
const heroSliderNextBtn = document.querySelector("[data-next-btn]"); // Botón de slide siguiente.

let currentSlidePos = 0; // Almacena la posición actual del slider.
let lastActiveSliderItem = heroSliderItems[0]; // Almacena el último slide activo.

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active"); // Quita la clase "active" del slide anterior.
  heroSliderItems[currentSlidePos].classList.add("active"); // Agrega la clase "active" al nuevo slide.
  lastActiveSliderItem = heroSliderItems[currentSlidePos]; // Actualiza el slide activo.
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) { // Si está en el último slide, vuelve al primero.
    currentSlidePos = 0;
  } else {
    currentSlidePos++; // Avanza al siguiente slide.
  }

  updateSliderPos(); // Actualiza la posición del slider.
}

heroSliderNextBtn.addEventListener("click", slideNext); // Agrega evento de clic para avanzar el slider.

const slidePrev = function () {
  if (currentSlidePos <= 0) { // Si está en el primer slide, vuelve al último.
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--; // Retrocede al slide anterior.
  }

  updateSliderPos(); // Actualiza la posición del slider.
}

heroSliderPrevBtn.addEventListener("click", slidePrev); // Agrega evento de clic para retroceder el slider.

/**
 * AUTO SLIDE
 */

let autoSlideInterval; // Variable para almacenar el intervalo del auto slide.

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext(); // Cambia el slide automáticamente cada 7 segundos.
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval); // Pausa el auto slide cuando el usuario pasa el mouse.
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide); // Reactiva el auto slide.

window.addEventListener("load", autoSlide); // Inicia el auto slide cuando la página carga.

/**
 * EFECTO PARALLAX
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]"); // Selecciona los elementos con efecto parallax.

let x, y; // Variables para almacenar las coordenadas del cursor.

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5; // Calcula la posición X relativa al tamaño de la ventana.
  y = (event.clientY / window.innerHeight * 10) - 5; // Calcula la posición Y relativa al tamaño de la ventana.

  // Invierte los valores (ejemplo: 20 → -20, -5 → 5).
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed); // Aplica la velocidad personalizada del parallax.
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`; // Mueve los elementos en el espacio 3D.
  }

});