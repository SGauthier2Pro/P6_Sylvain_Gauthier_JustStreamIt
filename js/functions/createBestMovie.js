export { createBestMovie };

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