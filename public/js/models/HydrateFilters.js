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
        // Get data
        const flattenList = data
            .map((e) => e.ingredients)
            .flat()
            .map((e) => e.ingredient.toLowerCase());

        // Remove duplicates
        const cleanList = [...new Set(flattenList)];

        // Update DOM
        cleanList.forEach((e) => {
            const node = document.createElement('li');
            node.innerText = e;
            ingredientsFilterList.appendChild(node);
        });
    }

    function fillMachines() {
        // Get data
        const flattenList = data.map((e) => e.appliance).flat();

        // Remove duplicates
        const cleanList = [...new Set(flattenList)].map((e) => e.toLowerCase()).sort();
        console.log(cleanList);

        // Update DOM
        cleanList.forEach((e) => {
            const node = document.createElement('li');
            node.innerText = e;
            machinesFilterList.appendChild(node);
        });
    }

    function fillUstensils() {
        // Get data
        const flattenList = data.map((e) => e.ustensils).flat();

        // Remove duplicates
        const cleanList = [...new Set(flattenList)].sort();

        // Update DOM
        cleanList.forEach((e) => {
            const node = document.createElement('li');
            node.innerText = e;
            ustensilsFilterList.appendChild(node);
        });
    }

    fillIngredients();
    fillMachines();
    fillUstensils();
};

export default hydrateFilters;
