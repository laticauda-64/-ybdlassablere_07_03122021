/**
 * Show / Hide selected filter on click
 */

import Tag from '../tags/Tag.js';

export default class CreateFilterButtons {
    constructor() {
        // Close current opened filter on click outside the element
        window.clickOutSide = (e) => {
            if (!e.target.closest('.filterOption.open')) {
                document.querySelectorAll('.filterOption').forEach((e) => e.classList.remove('open'));
                document.documentElement.removeEventListener('click', window.clickOutSide);
            }
        };

        // Create filters inside <li> elements
        this.hydrateFilters();

        // Add listeners to open/close filters
        document.querySelectorAll('.filterOption').forEach((e) => e.addEventListener('click', this.handleClickOnFilter));
        // Add listeners to handle search in filters
        document.querySelectorAll('.filterOption__searchInput').forEach((e) => e.addEventListener('keyup', this.searchInFilter));
    }

    // Create DOM <li> elements for each filters
    hydrateFilters() {
        const data = GlobalStore.dataWithFilters.length > 0 ? GlobalStore.dataWithFilters : GlobalStore.rawData;

        // Select dom filters buttons
        const ingredientsFilterList = document.querySelector('.filterOption--blue .filterOption__searchTags');
        const machinesFilterList = document.querySelector('.filterOption--green .filterOption__searchTags');
        const ustensilsFilterList = document.querySelector('.filterOption--red .filterOption__searchTags');

        // Clear previous data before rendering
        [ingredientsFilterList, machinesFilterList, ustensilsFilterList].forEach((e) => (e.innerHTML = ''));

        const fillIngredients = () => {
            // Get data
            const flattenList = data
                .map((e) => e.ingredients)
                .flat()
                .map((e) => e.ingredient.toLowerCase());

            // Remove duplicates & current filters
            const cleanList = [...new Set(flattenList)].filter((e) => !GlobalStore.currentTagList.includes(e));

            // Update DOM
            this.createFilterListElements(cleanList, ingredientsFilterList);
        };

        const fillMachines = () => {
            // Get data
            const flattenList = data
                .map((e) => e.appliance)
                .flat()
                .map((e) => e.toLowerCase());

            // Remove duplicates & current filters
            // const cleanList = [...new Set(flattenList)].map((e) => e.toLowerCase()).sort();
            const cleanList = [...new Set(flattenList)].filter((e) => !GlobalStore.currentTagList.includes(e));

            // Update DOM
            this.createFilterListElements(cleanList, machinesFilterList);
        };

        const fillUstensils = () => {
            // Get data
            const flattenList = data.map((e) => e.ustensils).flat();

            // Remove duplicates & current filters
            const cleanList = [...new Set(flattenList)].filter((e) => !GlobalStore.currentTagList.includes(e)).sort();

            // Update DOM
            this.createFilterListElements(cleanList, ustensilsFilterList);
        };

        fillIngredients();
        fillMachines();
        fillUstensils();
    }

    // Process click on a filter <li> element
    handleClickOnFilter(e) {
        const currentFilter = e.target.closest('.filterOption');

        // Close filter and reset input & options
        const closeFilters = () => {
            document.querySelectorAll('.filterOption').forEach((e) => {
                e.querySelector('.filterOption__searchInput').value = '';
                e.querySelector('.filterOption__searchTags').childNodes.forEach((e) => (e.style = ''));
                e.classList.remove('open');
            });
        };

        // Close current filter if click on the arrow detected
        if ((e.target.nodeName === 'IMG' || e.target.nodeName === 'BUTTON') && currentFilter.classList.contains('open')) {
            closeFilters();
            return;
        }
        // Close all the filters in case other are open
        closeFilters();

        // Finally open the current one
        currentFilter.classList.add('open');

        // And add a EventListenner on the document to detect 'outside' click
        document.documentElement.addEventListener('click', window.clickOutSide);
    }

    // Handle search in filters Buttons
    searchInFilter() {
        const inputText = this.value.toLowerCase().trim();
        const currentNodeFilter = Array.from(this.parentNode.nextElementSibling.children);

        const clearFilter = () => currentNodeFilter.forEach((e) => (e.style = ''));
        if (inputText.length < 3) {
            clearFilter();
            return;
        }

        currentNodeFilter.forEach((e) => (!e.innerHTML.includes(inputText) ? (e.style = 'display: none') : (e.style = '')));

        console.log(currentNodeFilter);
    }

    createFilterListElements(data, listContainer) {
        listContainer.innerHTML = '';
        // Create the li elements and inject them in dom
        data.forEach((e) => {
            const node = document.createElement('li');
            node.innerText = e;
            node.addEventListener('click', () => {
                new Tag(e, listContainer.dataset.type);
            });
            listContainer.appendChild(node);
        });
    }
}
