/**
 * Api to load recipes from js file
 * Use it as async function for future usage with "real" api
 */

import recipes from './data/recipes.js';

export default class Api {
    constructor() {}

    async fetchData() {
        return recipes;
    }
}
