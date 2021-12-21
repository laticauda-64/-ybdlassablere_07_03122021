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
            GlobalStore.dataWithFilters = data;
            new CreateFilterButtons();
            new DisplayRecipes(data);
        };

        if (inputText.length < 3) {
            if (GlobalStore.currentTagList.length === 0) {
                GlobalStore.searchBoxFilter = [];
                refreshData(GlobalStore.rawData);
                return;
            }
            GlobalStore.searchBoxFilter = [];
            refreshData(data);
            return;
        }

        // Global store is updated
        // The "famous" algorithme
        GlobalStore.searchBoxFilter = searchEngine(data, inputText);

        // Refresh data throught whole site (filters, results, etc)
        refreshData(GlobalStore.searchBoxFilter);

        // If results from Search = null > display error msg on page
        if (GlobalStore.searchBoxFilter.length === 0) {
            const node = document.createElement('p');
            node.classList.add('foundError');
            node.innerText =
                'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc...';
            document.querySelector('.results').appendChild(node);
            // console.log('No results');
        }
    }
}
