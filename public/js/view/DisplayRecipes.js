/**
 * Display all recipes on main page
 */

import Recipe from './Recipe.js';

export default class DisplayRecipes {
    constructor(data) {
        // Recipes
        this.data = data;

        // Dom : place to display
        this.dom = document.querySelector('.results');
        this.dom.innerHTML = '';
    }

    launch() {
        this.data.forEach((element) => {
            this.dom.appendChild(new Recipe(element).create());
        });
    }
}
