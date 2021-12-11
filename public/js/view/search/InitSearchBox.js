/**
 * Initialize main Searchbox
 *
 */
import DisplayRecipes from '../DisplayRecipes.js';
import hydrateFilters from '../../models/HydrateFilters.js';
import searchEngine from '../../models/SearchEngine.js';

const initSearchBox = () => {
    const searchBox = document.getElementById('search');

    const searchListenner = function () {
        // If filters tag -> data = dataWithFilters;
        const data = GlobalStore.dataWithFilters.length > 0 ? GlobalStore.dataWithFilters : GlobalStore.rawData;
        const inputText = this.value.toLowerCase().trim();

        const refreshData = (data) => {
            new DisplayRecipes(data).launch();
            hydrateFilters(data);
        };

        if (inputText.length < 3) {
            GlobalStore.searchBoxFilter = [];
            refreshData(data);
            return;
        }

        // The "famous" algorithme
        GlobalStore.searchBoxFilter = searchEngine(data, inputText);

        refreshData(GlobalStore.searchBoxFilter);
    };

    searchBox.addEventListener('keyup', searchListenner);
};

export default initSearchBox;
