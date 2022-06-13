/**
 * Classe Movie
 */

export { Movie };

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
        this.datePublished = this.getFrDate(elementResult.date_published);
        this.rated = this.checkIfNumber(elementResult.rated);
        this.imdb_score = this.checkIfNumber(elementResult.imdb_score);
        this.directors = elementResult.directors;
        this.actors = elementResult.actors;
        this.duration = this.checkIfNumber(elementResult.duration);
        this.countries = elementResult.countries;
        this.boxoffice = this.checkIfNumber(elementResult.worldwide_gross_income);
        this.description = this.checkDescription(elementResult.description);
        this.longDescription = this.checkDescription(elementResult.long_description);
    }

    /**
     * remet la date au format Fr
     * @param {String} dateToTransform 
     * @returns strin
     */
    getFrDate(dateToTransform) {
        try {
            let datePublished = new Date(dateToTransform);
            let myMonth = datePublished.getMonth() + 1;
            if (myMonth < 10) {
                myMonth = '0' + myMonth;
            }
            let dateToReturn = datePublished.getDate() + '-' + myMonth + '-' + datePublished.getFullYear();
            return dateToReturn;
        } catch (TypeError) {
            return 'N/C';
        }

    }

    /**
     * Verifie que la description ne soi pas incomplete ou vide
     * @param {String} descriptionToTest 
     * @returns 
     */
    checkDescription(descriptionToTest) {
        if (descriptionToTest.length <= 1) {
            return 'N/C';
        } else {
            return descriptionToTest;
        }
    }

    /**
     * Verifie si il s'agit bien d'une valeur numerique 
     * @param {String} intToTest 
     * @returns
     */
    checkIfNumber(numberToTest) {
        if (isNaN(Number(numberToTest)) || numberToTest == null) {
            return 'N/C';
        } else {
            return numberToTest;
        }

    }
}