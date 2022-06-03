/**
 * Créer un div avec une class
 * @param {string} className 
 * @returns {HTMLElement}
 */
function createDivWithClass(className) {
    let div = document.createElement('div');
    div.setAttribute('class', className);
    return div;

}

/**
 * Créer un bouton avec une class
 * @param {string} className 
 * @returns {HTMLElement}
 */
function createButtonWithClass(className) {
    let button = document.createElement('button');
    button.setAttribute('class', className);
    return button;
}

/**
 * Créer un item de liste avec sa valeur
 * @param {string} className 
 * @returns {HTMLElement}
 */
function createListItemWithValue(textValue) {
    let listItem = document.createElement('li');
    listItem.textContent = textValue;
    return listItem;
}

class Carousel {

    /**
     * 
     * @param {HTMLElement} element 
     * @param {JSON} requestResponse
     * @param {Object} options 
     * @param {Object} options.slideToScroll Nombre d'éléments a faire défiler
     * @param {Object} options.slidesVisible Nombre déléments visible dans une slide
     */
    constructor(element, requestResponse, options = {}) {
        //console.log(requestResponse.results);
        this.element = element;
        this.requestResponse = requestResponse.results;
        this.urlImages = this.getMoviesImage();
        this.movieIds = this.getMoviesId();
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options);
        let children = [].slice.call(element.children);
        this.currentItem = 0;
        this.root = createDivWithClass('carousel');
        this.container = createDivWithClass('carousel__container');
        this.root.appendChild(this.container);
        this.element.appendChild(this.root);
        let indexMovie = 0;
        this.items = children.map((child) => {
            let imageTag = child.getElementsByTagName('img');
            imageTag[0].setAttribute('src', this.urlImages[indexMovie]);
            child.setAttribute('id', 'trigger-' + this.movieIds[indexMovie]);
            indexMovie++;
            let item = createDivWithClass('carousel__item');
            item.appendChild(child);
            this.container.appendChild(item);
            return item;
        });
        this.setStyle();
        this.createNavigation();


    }

    /**
     * applique les bonne dimension aux éléments du carousel
     */
    setStyle() {

        let ratio = this.items.length / this.options.slidesVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%");

    }

    createNavigation() {
        let nextButton = createDivWithClass('carousel__next');
        let prevButton = createDivWithClass('carousel__prev');
        this.element.appendChild(nextButton);
        this.element.appendChild(prevButton);
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));

    }


    getMoviesImage() {
        let urlImages = new Array();
        this.requestResponse.forEach(movieItem => {
            urlImages.push(movieItem.image_url);
        });

        return urlImages;
    }

    getMoviesId() {
        let idMovies = new Array();
        this.requestResponse.forEach(movieItem => {
            idMovies.push(movieItem.id);
        });

        return idMovies;
    }

    /**
     * avance le carousel du nombre d'item en option
     */
    next() {
        this.gotoItem(this.currentItem + this.options.slideToScroll);
    }

    /**
     * recule du nombre d'item passé en option
     */
    prev() {
        this.gotoItem(this.currentItem - this.options.slideToScroll);
    }

    /**
     * Déplce le carousel vers l'élément ciblé
     * @param {number} index 
     */
    gotoItem(index) {
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible;
        } else if (index > (this.items.length - this.options.slidesVisible)) {
            index = 0;
        }
        let translateX = index * -100 / this.items.length;
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
        this.currentItem = index;
    }


}

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

        let datePublishedValue = 'Date de sortie : ';
        let datePublishedSplited = movieObject.datePublished.split('-');
        datePublishedValue += datePublishedSplited[2] + '-' + datePublishedSplited[1] + '-' + datePublishedSplited[0];
        this.datePublishedItem = createListItemWithValue(datePublishedValue);
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

        this.movieDurationItem = createListItemWithValue("Durée : " + movieObject.duration);
        this.movieDetailsList.appendChild(this.movieDurationItem);

        let movieCountriesValue = 'Pays :';
        movieObject.countries.forEach(country => {
            movieCountriesValue += ' ' + country + ',';
        });
        movieCountriesValue = movieCountriesValue.substring(0, movieCountriesValue.length - 1);
        this.movieCountriesItem = createListItemWithValue(movieCountriesValue);
        this.movieDetailsList.appendChild(this.movieCountriesItem);

        this.movieBoxOfficeItem = createListItemWithValue('Résultat Box Office : ' + movieObject.boxoffice + ' ' + movieObject.budgetCurrency);
        this.movieDetailsList.appendChild(this.movieBoxOfficeItem);

        this.modal.appendChild(this.movieDetails);

        this.movieDescription = document.createElement('p');
        this.movieDescription.setAttribute('class', 'dialogDesc');
        this.movieDescription.textContent = "Description :\n";
        this.movieDescription.textContent += movieObject.longDescription;
        this.modal.appendChild(this.movieDescription);


    }
}

class Movie {

    /**
     * 
     * @param {JSON} elementResult resultat de la requete du requester
     */
    constructor(elementResult) {
        this.id = elementResult.id;
        this.coverPicture = elementResult.image_url;
        this.title = elementResult.original_title;
        this.genres = elementResult.genres;
        this.datePublished = elementResult.date_published;
        this.rated = elementResult.rated;
        this.imdb_score = elementResult.imdb_score;
        this.directors = elementResult.directors;
        this.actors = elementResult.actors;
        this.duration = elementResult.duration;
        this.countries = elementResult.countries;
        this.boxoffice = elementResult.worldwide_gross_income;
        this.budgetCurrency = elementResult.budget_currency;
        this.description = elementResult.description;
        this.longDescription = elementResult.long_description;
    }
}

/**
 * fonction créant les modale de la page
 * @param {JSON} requestResponse 
 * @param {String} urlApiTitles 
 */
function createModals(requestResponse, urlApiTitles) {
    requestResponse.results.forEach(movie => {

        //console.log(movie.title);

        let urlToRequest = urlApiTitles + movie.id;
        let movieRequest = new XMLHttpRequest();

        movieRequest.open("get", urlToRequest);
        movieRequest.responseType = "json";
        movieRequest.send();

        movieRequest.onload = function() {
            //moviesObject.push(new Movie(movieRequest.response));
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
                });

            }

            function closeModals() {
                modalContainers.forEach(modalContainer => {
                    if (modalContainer.getAttribute('class') == 'modal-container active') {
                        modalContainer.setAttribute('class', 'modal-container');
                    }
                });
            }
        };

    });
}

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

            createModals(requestResponse, urlApiTitles);

            new Carousel(document.querySelector('#best-movies-carousel'), requestResponse, {
                slideToScroll: 1,
                slidesVisible: 4
            });

        }
    }

}

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

document.addEventListener('DOMContentLoaded', function() {

    let urlApiTitles = "http://127.0.0.1:8000/api/v1/titles/"

    let categorie1 = "Sci-Fi";
    let categorie2 = "Action";
    let categorie3 = "Animation";

    let urlBestMovies = "http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7";
    let urlCategorie1 = "http://127.0.0.1:8000/api/v1/titles/?genre=" + categorie1 + "&sort_by=-imdb_score&page_size=7";
    let urlCategorie2 = "http://127.0.0.1:8000/api/v1/titles/?genre=" + categorie2 + "&sort_by=-imdb_score&page_size=7";
    let urlCategorie3 = "http://127.0.0.1:8000/api/v1/titles/?genre=" + categorie3 + "&sort_by=-imdb_score&page_size=7";

    createBestMovies(urlBestMovies, urlApiTitles);

    createCategorie(urlCategorie1, urlApiTitles, 1);

    createCategorie(urlCategorie2, urlApiTitles, 2);

    createCategorie(urlCategorie3, urlApiTitles, 3);

});