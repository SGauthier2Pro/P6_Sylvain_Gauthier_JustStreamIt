export { createCategorie };

import { Carousel } from '../classes/carousel.js';
import { createModals } from '../functions/createModals.js';

/**
 * fonction créant le carousel d'une categorie donnée
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