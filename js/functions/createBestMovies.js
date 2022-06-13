export { createBestMovies };

import { createBestMovie } from './createBestMovie.js';
import { createModals } from './createModals.js';
import { Carousel } from '../classes/carousel.js';

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