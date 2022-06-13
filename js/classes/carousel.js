/**
 * Classe Carousel
 */

export { Carousel };


import { createDivWithClass } from '../functions/helpers.js';

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
        this.element = element;
        this.requestResponse = requestResponse.results;
        this.urlImages = this.getMoviesImage();
        this.movieIds = this.getMoviesId();
        this.options = Object.assign({}, {
            slideToScroll: 1,
            slidesVisible: 1,
            bestMovies: false
        }, options);
        let children = [].slice.call(element.children);
        this.isMobile = false;
        this.currentItem = 0;
        this.root = createDivWithClass('carousel');
        this.container = createDivWithClass('carousel__container');
        this.root.appendChild(this.container);
        this.element.appendChild(this.root);
        let indexMovie = 0;
        if (this.options.bestMovies) {
            indexMovie = 1;
        }
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
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize.bind(this));

    }

    /**
     * applique les bonne dimension aux éléments du carousel
     */
    setStyle() {

        let ratio = this.items.length / this.slidesVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%");

    }

    /**
     * crée les bouton de navigation des carousels
     */
    createNavigation() {
        let nextButton = createDivWithClass('carousel__next');
        let prevButton = createDivWithClass('carousel__prev');
        this.element.appendChild(nextButton);
        this.element.appendChild(prevButton);
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));

    }

    /**
     * ecoute le redimensionnment de la fenetre pour le web responsive
     */
    onWindowResize() {
        let mobile = window.innerWidth < 800;
        if (mobile !== this.isMobile) {
            this.isMobile = mobile;
            this.setStyle();
            if (mobile === false && this.currentItem === 6) {
                this.gotoItem(this.currentItem - (this.slidesVisible - 1));
            }
        }
    }

    /**
     * 
     * @returns {Array} retourne le tableau des url d'image
     */
    getMoviesImage() {
        let urlImages = new Array();
        this.requestResponse.forEach(movieItem => {
            urlImages.push(movieItem.image_url);
        });

        return urlImages;
    }

    /**
     * 
     * @returns {Array} retourne le tableau des id de film
     */
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
        this.gotoItem(this.currentItem + this.slideToScroll);
    }

    /**
     * recule du nombre d'item passé en option
     */
    prev() {
        this.gotoItem(this.currentItem - this.slideToScroll);
    }

    /**
     * Déplce le carousel vers l'élément ciblé
     * @param {number} index 
     */
    gotoItem(index) {
        if (index < 0) {
            index = this.items.length - this.slidesVisible;
        } else if (index > (this.items.length - this.slidesVisible)) {
            index = 0;
        }
        let translateX = index * -100 / this.items.length;
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
        this.currentItem = index;
    }

    /**
     * @returns {number}
     */
    get slideToScroll() {
        return this.isMobile ? 1 : this.options.slideToScroll;
    }

    /**
     * @returns {number}
     */
    get slidesVisible() {
        return this.isMobile ? 1 : this.options.slidesVisible;
    }

}