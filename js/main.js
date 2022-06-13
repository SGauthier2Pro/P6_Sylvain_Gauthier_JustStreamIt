import { Carousel } from './carousel.js';
import { Modal } from './modal.js';
import { Movie } from './movie.js';

/**
 * fonction créant les modales de la page
 * @param {JSON} requestResponse 
 * @param {String} urlApiTitles 
 */
function createModals(requestResponse, urlApiTitles) {
    requestResponse.results.forEach(movie => {

        let urlToRequest = urlApiTitles + movie.id;
        let movieRequest = new XMLHttpRequest();

        movieRequest.open("get", urlToRequest);
        movieRequest.responseType = "json";
        movieRequest.send();

        movieRequest.onload = function() {
            let newMovie = new Movie(movieRequest.response);
            new Modal(document.querySelector('body'), newMovie);


            const modalContainers = document.querySelectorAll('.modal-container');
            const modalTriggers = document.querySelectorAll(".modal-trigger");

            modalTriggers.forEach(trigger => {
                if (trigger.getAttribute('id') == 'trigger-' + newMovie.id) {
                    trigger.addEventListener("click", toggleModal);
                } else if (trigger.getAttribute('class') == 'close-modal modal-trigger') {
                    trigger.addEventListener("click", closeModals);
                }

            });

            function toggleModal() {
                modalContainers.forEach(modalContainer => {
                    if (modalContainer.getAttribute('id') == newMovie.id) {
                        modalContainer.classList.toggle("active");
                    }
                    let myBody = document.getElementsByTagName('body');
                    myBody[0].setAttribute('class', 'body--noscroll');
                });

            }

            function closeModals() {
                modalContainers.forEach(modalContainer => {
                    if (modalContainer.getAttribute('class') == 'modal-container active') {
                        modalContainer.setAttribute('class', 'modal-container');
                    }
                    let myBody = document.getElementsByTagName('body');
                    myBody[0].classList.remove('body--noscroll');
                });
            }
        };

    });
}

/**
 * Fonction modifiant la tete d'affiche avec les informations du film le mieux noté
 * @param {JSON} requestResponse 
 * @param {String} urlApiTitles 
 */
function createBestMovie(requestResponse, urlApiTitles) {
    let idMovie = requestResponse.results[0].id;
    let urlBestMovie = urlApiTitles + idMovie;

    let xmlHttpElement = new XMLHttpRequest();

    xmlHttpElement.open("get", urlBestMovie);
    xmlHttpElement.responseType = "json";
    xmlHttpElement.send();

    xmlHttpElement.onload = function() {

        if (xmlHttpElement.status != 200) {
            console.log("Erreur" + xmlHttpElement.status + ":" + xmlHttpElement.statusText);
        } else {

            const requestResponse = xmlHttpElement.response;

            let bestMovieTitle = document.getElementById('best-movie-title');
            let bestMovieButton = document.getElementById('best-movie-button');
            let bestMovieDescription = document.getElementById('best-movie-description-text');
            let bestMovieImage = document.getElementById('best-image');
            bestMovieTitle.textContent = requestResponse.title;
            bestMovieButton.setAttribute('id', 'trigger-' + requestResponse.id);
            bestMovieDescription.textContent = requestResponse.description;
            bestMovieImage.setAttribute('src', requestResponse.image_url);
        }

    }
}

/**
 * Crée le carousel des meilleurs film
 * @param {String} urlBestMovies 
 * @param {String} urlApiTitles 
 */
function createBestMovies(urlBestMovies, urlApiTitles) {

    let xmlHttpElement = new XMLHttpRequest();

    xmlHttpElement.open("get", urlBestMovies);
    xmlHttpElement.responseType = "json";
    xmlHttpElement.send();

    xmlHttpElement.onload = function() {


        if (xmlHttpElement.status != 200) {
            console.log("Erreur" + xmlHttpElement.status + ":" + xmlHttpElement.statusText);
        } else {

            const requestResponse = xmlHttpElement.response;

            createBestMovie(requestResponse, urlApiTitles);

            createModals(requestResponse, urlApiTitles);

            new Carousel(document.querySelector('#best-movies-carousel'), requestResponse, {
                slideToScroll: 1,
                slidesVisible: 4,
                bestMovies: true
            });



        }
    }

}

/**
 * fonctoin créant le carousel d'une categorie données
 * @param {string} urlCategorie 
 * @param {string} urlApiTitles 
 * @param {number} categorieNumber 
 */
function createCategorie(urlCategorie, urlApiTitles, categorieNumber) {

    let xmlHttpElement = new XMLHttpRequest();

    xmlHttpElement.open("get", urlCategorie);
    xmlHttpElement.responseType = "json";
    xmlHttpElement.send();

    xmlHttpElement.onload = function() {


        if (xmlHttpElement.status != 200) {
            console.log("Erreur" + xmlHttpElement.status + ":" + xmlHttpElement.statusText);
        } else {

            const requestResponse = xmlHttpElement.response;

            createModals(requestResponse, urlApiTitles);

            new Carousel(document.querySelector('#categorie' + categorieNumber + '-carousel'), requestResponse, {
                slideToScroll: 1,
                slidesVisible: 4
            });

        }
    }

}

/**
 * fonction modifiant le titre d'une categorie donnée
 * @param {string} categorieTitleId 
 * @param {string} categorie 
 */
function setCategorieTitle(categorieTitleId, categorie) {
    let title = document.getElementById(categorieTitleId);
    title.textContent = categorie;
}


/**
 * execution principale du programme
 */
document.addEventListener('DOMContentLoaded', function() {

    let urlApiTitles = "http://127.0.0.1:8000/api/v1/titles/"

    let categorie1 = "Sci-Fi";
    let categorie2 = "Action";
    let categorie3 = "Animation";

    setCategorieTitle('categorie1-title', categorie1);
    setCategorieTitle('categorie2-title', categorie2);
    setCategorieTitle('categorie3-title', categorie3);

    let urlBestMovies = "http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page_size=8";
    let urlCategorie1 = "http://127.0.0.1:8000/api/v1/titles/?genre=" + categorie1 + "&sort_by=-imdb_score&page_size=7";
    let urlCategorie2 = "http://127.0.0.1:8000/api/v1/titles/?genre=" + categorie2 + "&sort_by=-imdb_score&page_size=7";
    let urlCategorie3 = "http://127.0.0.1:8000/api/v1/titles/?genre=" + categorie3 + "&sort_by=-imdb_score&page_size=7";

    createBestMovies(urlBestMovies, urlApiTitles);

    createCategorie(urlCategorie1, urlApiTitles, 1);

    createCategorie(urlCategorie2, urlApiTitles, 2);

    createCategorie(urlCategorie3, urlApiTitles, 3);

});