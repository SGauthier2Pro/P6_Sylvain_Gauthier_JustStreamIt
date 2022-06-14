import { setCategorieTitle } from './functions/setCategorieTitle.js';
import { createBestMovies } from './functions/createBestMovies.js';
import { createCategorie } from './functions/createCategorie.js';



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

    let urlBestMovies = urlApiTitles + "?sort_by=-imdb_score&page_size=8";
    let urlCategorie1 = urlApiTitles + "?genre=" + categorie1 + "&sort_by=-imdb_score&page_size=7";
    let urlCategorie2 = urlApiTitles + "?genre=" + categorie2 + "&sort_by=-imdb_score&page_size=7";
    let urlCategorie3 = urlApiTitles + "?genre=" + categorie3 + "&sort_by=-imdb_score&page_size=7";

    createBestMovies(urlBestMovies, urlApiTitles);

    createCategorie(urlCategorie1, urlApiTitles, 1);

    createCategorie(urlCategorie2, urlApiTitles, 2);

    createCategorie(urlCategorie3, urlApiTitles, 3);

});