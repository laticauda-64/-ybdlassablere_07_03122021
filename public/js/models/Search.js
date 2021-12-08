/**
 * Search functionnality
 *
 */

import DisplayRecipes from '../view/DisplayRecipes.js';
import hydrateFilters from './HydrateFilters.js';

const searchEngine = function () {
    const data = Window.pp_data;
    const inputText = this.value.toLowerCase().trim();

    const refreshData = (data) => {
        new DisplayRecipes(data).launch();
        hydrateFilters(data);
    };

    if (inputText.length < 3) {
        refreshData(data);
        return;
    }

    // Le fameux "algorythme"
    const filteredData = data.filter(
        (e) =>
            e.name.toLowerCase().includes(inputText) ||
            e.description.toLowerCase().includes(inputText) ||
            e.ingredients.some((e) => e.ingredient.toLowerCase().includes(inputText))
    );

    refreshData(filteredData);

    // console.log(data);
};

export default searchEngine;
