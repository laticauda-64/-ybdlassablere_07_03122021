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
        const data = GlobalStore.rawData;
        const inputText = this.value.toLowerCase().trim();

        const refreshData = (data) => {
            new DisplayRecipes(data).launch();
            hydrateFilters(data);
        };

        if (inputText.length < 3) {
            refreshData(data);
            return;
        }

        // The "famous" algorithme
        const filteredData = searchEngine(data, inputText);

        refreshData(filteredData);
    };

    searchBox.addEventListener('keyup', searchListenner);
};

export default initSearchBox;
