/**
 *
 * Fill the different filters with fresh data
 *
 * @param {*} data -> list of recipes
 */

import ToggleFilters from '../view/filters/ToggleFilters.js';

const hydrateFilters = (data) => {
    const ingredientsFilterList = document.querySelector('.filterOption--blue .filterOption__searchTags');
    const machinesFilterList = document.querySelector('.filterOption--green .filterOption__searchTags');
    const ustensilsFilterList = document.querySelector('.filterOption--red .filterOption__searchTags');

    function fillIngredients() {
        // Get data
        const flattenList = data
            .map((e) => e.ingredients)
            .flat()
            .map((e) => e.ingredient.toLowerCase());

        // Remove duplicates
        const cleanList = [...new Set(flattenList)];

        // Update DOM
        ToggleFilters.fillFilterList(cleanList, ingredientsFilterList);
    }

    function fillMachines() {
        // Get data
        const flattenList = data.map((e) => e.appliance).flat();

        // Remove duplicates
        const cleanList = [...new Set(flattenList)].map((e) => e.toLowerCase()).sort();

        // Update DOM
        ToggleFilters.fillFilterList(cleanList, machinesFilterList);
    }

    function fillUstensils() {
        // Get data
        const flattenList = data.map((e) => e.ustensils).flat();

        // Remove duplicates
        const cleanList = [...new Set(flattenList)].sort();

        // Update DOM
        ToggleFilters.fillFilterList(cleanList, ustensilsFilterList);
    }

    fillIngredients();
    fillMachines();
    fillUstensils();
};

export default hydrateFilters;