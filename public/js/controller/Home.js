/**
 * Main App JS file
 */
import Api from '../models/Api.js';
import DisplayRecipes from '../view/DisplayRecipes.js';

export default class App {
    constructor() {
        this.dom = {};
        this.data;
        this.filter;
    }

    static async launch() {
        // Fetch recipes from js file and store it
        this.data = await new Api().fetchData();
        console.log(this.data);

        // Display all recipes in dom
        new DisplayRecipes(this.data).launch();
    }
}
