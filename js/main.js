class Carousel {

    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} options.slideToScroll Nombre d'éléments a faire défiler
     * @param {Object} options.slidesVisible Nombre déléments visible dans une slide
     */
    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)
        let children = [].slice.call(element.children)
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')

            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()


    }

    /**
     * applique les bonne dimension aux éléments du carousel
     */
    setStyle() {

        let ratio = this.items.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%")

    }

    createNavigation() {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.element.appendChild(nextButton)
        this.element.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))

    }

    /**
     * avance le carousel du nombre d'item en option
     */
    next() {
        this.gotoItem(this.currentItem + this.options.slideToScroll)
    }

    /**
     * recule du nombre d'item passé en option
     */
    prev() {
        this.gotoItem(this.currentItem - this.options.slideToScroll)
    }

    /**
     * Déplce le carousel vers l'élément ciblé
     * @param {number} index 
     */
    gotoItem(index) {
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible
        } else if (index > (this.items.length - this.options.slidesVisible)) {
            index = 0
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        this.currentItem = index
    }

    /**
     * Créer un div avec un class
     * @param {string} className 
     * @returns {HTMLElement}
     */
    createDivWithClass(className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div

    }

}

class Movie {

    /**
     * 
     * @param {JSON} elementResult resultat de la requete du requester
     */
    constructor(elementResult) {
        this.id = ""
        this.coverPicture = ""
        this.title = ""
        this.genres = ""
        this.rated = ""
        this.imdb_score = ""
        this.directors = ""
        this.actors = ""
        this.duration = ""
        this.country = ""
        this.description = ""
        this.long_description = ""
    }
}


document.addEventListener('DOMContentLoaded', function() {

    new Carousel(document.querySelector('#best-movies-carousel'), {
        slideToScroll: 1,
        slidesVisible: 4
    })

    new Carousel(document.querySelector('#scifi-movies-carousel'), {
        slideToScroll: 1,
        slidesVisible: 4
    })

    new Carousel(document.querySelector('#action-movies-carousel'), {
        slideToScroll: 1,
        slidesVisible: 4
    })

    new Carousel(document.querySelector('#animation-movies-carousel'), {
        slideToScroll: 1,
        slidesVisible: 4
    })

    const modalContainer = document.querySelector(".modal-container");
    const modalTriggers = document.querySelectorAll(".modal-trigger");

    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

    function toggleModal() {
        modalContainer.classList.toggle("active")
    }

})