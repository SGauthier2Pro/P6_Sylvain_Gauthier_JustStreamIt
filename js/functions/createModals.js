export { createModals };

import { Modal } from '../classes/modal.js';
import { Movie } from '../classes/movie.js';
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