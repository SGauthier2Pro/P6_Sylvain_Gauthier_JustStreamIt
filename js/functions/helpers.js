/**
 * Helpers : fonctions de construction de div
 */

export { createDivWithClass, createButtonWithClass, createListItemWithValue };

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