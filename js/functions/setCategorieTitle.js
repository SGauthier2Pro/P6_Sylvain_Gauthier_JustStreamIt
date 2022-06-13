export { setCategorieTitle };

/**
 * fonction modifiant le titre d'une categorie donnée
 * @param {string} categorieTitleId 
 * @param {string} categorie 
 */
function setCategorieTitle(categorieTitleId, categorie) {
    let title = document.getElementById(categorieTitleId);
    title.textContent = categorie;
}