/**
 *
 * Fill the different filters with fresh data
 *
 * @param {*} data -> list of recipes
 */

const hydrateFilters = (data) => {
    const ingredientsFilterList = document.querySelector('.filterOption--blue .filterOption__searchTags');
    const machinesFilterList = document.querySelector('.filterOption--green .filterOption__searchTags');
    const ustensilsFilterList = document.querySelector('.filterOption--red .filterOption__searchTags');

    function fillIngredients() {
        const flattenList = data
            .map((e) => e.ingredients)
            .flat()
            .map((e) => e.ingredient.toLowerCase());

        // Remove duplicates
        return [...new Set(flattenList)];
    }

    function fillMachines() {}

    function fillUstensils() {}

    console.log(fillIngredients());
};

export default hydrateFilters;
