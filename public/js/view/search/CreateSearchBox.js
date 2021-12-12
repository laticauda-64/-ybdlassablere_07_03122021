/**
 * Initialize main Searchbox
 *
 */
import DisplayRecipes from '../DisplayRecipes.js';
import searchEngine from '../../models/searchEngine.js';
import CreateFilterButtons from '../filters/CreateFilterButtons.js';

export default class CreateSearchBox {
    constructor() {
        const searchBox = document.getElementById('search');
        searchBox.addEventListener('keyup', this.searchListenner);
    }
    searchListenner() {
        // If filters tag -> data = dataWithFilters;
        const data = GlobalStore.dataWithFilters.length > 0 ? GlobalStore.dataWithFilters : GlobalStore.rawData;
        const inputText = this.value.toLowerCase().trim();

        const refreshData = (data) => {
            new CreateFilterButtons();
            new DisplayRecipes(data);
        };

        if (inputText.length < 3) {
            GlobalStore.searchBoxFilter = [];
            refreshData(data);
            return;
        }

        // The "famous" algorithme
        GlobalStore.searchBoxFilter = searchEngine(data, inputText);

        refreshData(GlobalStore.searchBoxFilter);
    }
}
