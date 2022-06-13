/**
 * Classe modale
 */

export { Modal };

import { createDivWithClass, createButtonWithClass, createListItemWithValue } from '../functions/helpers.js';

class Modal {

    /**
     * 
     * @param {HTMLElement} htmlElement element body de la page
     * @param {Object} movieObject objet film
     */
    constructor(htmlElement, movieObject) {

        this.root = htmlElement;

        this.modalContainer = createDivWithClass('modal-container');
        this.modalContainer.setAttribute('id', movieObject.id);
        this.root.appendChild(this.modalContainer);

        this.overlay = createDivWithClass('overlay modal-trigger');
        this.modalContainer.appendChild(this.overlay);

        this.modal = createDivWithClass('modal');
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-labelledby', 'modalTitle');
        this.modal.setAttribute('aria-describedby', 'dialogDesc');
        this.modalContainer.appendChild(this.modal);

        this.button = createButtonWithClass('close-modal modal-trigger');
        this.button.setAttribute('aria-label', 'close Modal');
        this.button.textContent = 'X';
        this.modal.appendChild(this.button);

        this.h1 = document.createElement('h1');
        this.h1.setAttribute('class', 'modalTitle');
        this.h1.textContent = movieObject.title;
        this.modal.appendChild(this.h1);

        this.img = document.createElement('img');
        this.img.setAttribute('src', movieObject.coverPicture);
        this.img.setAttribute('alt', 'image_film');
        this.modal.appendChild(this.img);

        this.movieDetails = createDivWithClass('movie_details');

        this.movieDetailsList = document.createElement('ul');
        this.movieDetails.appendChild(this.movieDetailsList);

        let movieGenresValue = "Genre :";
        movieObject.genres.forEach(genre => {
            movieGenresValue += ' ' + genre + ',';
        });
        movieGenresValue = movieGenresValue.substring(0, movieGenresValue.length - 1);
        this.movieGenresItem = createListItemWithValue(movieGenresValue);
        this.movieDetailsList.appendChild(this.movieGenresItem);

        this.datePublishedItem = createListItemWithValue('Date de sortie : ' + movieObject.datePublished);
        this.movieDetailsList.appendChild(this.datePublishedItem);


        this.movieRatedItem = createListItemWithValue("Classement : " + movieObject.rated);
        this.movieDetailsList.appendChild(this.movieRatedItem);

        this.imdbScoreItem = createListItemWithValue("Score Imdb : " + movieObject.imdb_score + '/10');
        this.movieDetailsList.appendChild(this.imdbScoreItem);

        let movieDirectorsValue = "Réalisateurs :";
        movieObject.directors.forEach(director => {
            movieDirectorsValue += ' ' + director + ',';
        });
        movieDirectorsValue = movieDirectorsValue.substring(0, movieDirectorsValue.length - 1);
        this.movieDirectorsItem = createListItemWithValue(movieDirectorsValue);
        this.movieDetailsList.appendChild(this.movieDirectorsItem);

        let movieActorsValue = 'Acteurs :';
        movieObject.actors.forEach(actor => {
            movieActorsValue += ' ' + actor + ',';
        });
        movieActorsValue = movieActorsValue.substring(0, movieActorsValue.length - 1);
        this.movieActorsItem = createListItemWithValue(movieActorsValue);
        this.movieDetailsList.appendChild(this.movieActorsItem);

        this.movieDurationItem = createListItemWithValue("Durée : " + movieObject.duration + ' minutes');
        this.movieDetailsList.appendChild(this.movieDurationItem);

        let movieCountriesValue = 'Pays :';
        movieObject.countries.forEach(country => {
            movieCountriesValue += ' ' + country + ',';
        });
        movieCountriesValue = movieCountriesValue.substring(0, movieCountriesValue.length - 1);
        this.movieCountriesItem = createListItemWithValue(movieCountriesValue);
        this.movieDetailsList.appendChild(this.movieCountriesItem);

        this.movieBoxOfficeItem = createListItemWithValue('Résultat Box Office : ' + movieObject.boxoffice);
        this.movieDetailsList.appendChild(this.movieBoxOfficeItem);

        this.modal.appendChild(this.movieDetails);

        this.movieDescription = document.createElement('p');
        this.movieDescription.setAttribute('class', 'dialogDesc');
        this.movieDescription.textContent = "Description :\n";
        this.movieDescription.textContent += movieObject.longDescription;
        this.modal.appendChild(this.movieDescription);


    }
}