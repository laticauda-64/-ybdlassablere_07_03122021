/**
 * Main App JS file
 */
import Api from '../models/Api.js';
import DisplayRecipes from '../view/DisplayRecipes.js';
import CreateFilterButtons from '../view/filters/CreateFilterButtons.js';
import CreateSearchBox from '../view/search/CreateSearchBox.js';

export default async function App() {
    // Fetch recipes from js file and store it globally
    GlobalStore.rawData = await Api();

    // Create logic & listenners for search bar
    new CreateSearchBox();

    // Create dom <li> elements for filters
    new CreateFilterButtons();

    // Create recipes from data
    new DisplayRecipes(GlobalStore.rawData);
}
