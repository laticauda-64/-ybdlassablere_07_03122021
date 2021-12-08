/**
 * Main App JS file
 */
import Api from '../models/Api.js';
import DisplayRecipes from '../view/DisplayRecipes.js';
import ToggleFilters from '../view/filters/ToggleFilters.js';
import hydrateFilters from '../models/HydrateFilters.js';
import initSearchBox from '../view/search/InitSearchBox.js';

export default class App {
    static async launch() {
        // Fetch recipes from js file and store it globally
        GlobalStore.rawData = await new Api().fetchData();

        // Display all recipes in dom
        new DisplayRecipes(GlobalStore.rawData).launch();

        // Filters
        new ToggleFilters();
        hydrateFilters(GlobalStore.rawData);

        // Search
        initSearchBox();
    }
}
