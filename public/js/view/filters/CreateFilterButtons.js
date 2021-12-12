/**
 * Show / Hide selected filter on click
 */

import Tag from '../tags/Tag.js';

export default class ToggleFilters {
    constructor() {
        // Close current opened filter on click outside the element
        // I know it's bad to store it in Window but can't figure out how to remove this listenner without this trick
        window.clickOutSide = (e) => {
            if (!e.target.closest('.filterOption.open')) {
                document.querySelectorAll('.filterOption').forEach((e) => e.classList.remove('open'));
                document.documentElement.removeEventListener('click', window.clickOutSide);
            }
        };

        // Add listeners to open/close filters
        document.querySelectorAll('.filterOption').forEach((e) => e.addEventListener('click', this.toggleSelectedFilter));
        // Add listeners to handle search in filters
        document.querySelectorAll('.filterOption__searchInput').forEach((e) => e.addEventListener('keyup', this.searchInFilter));
    }

    toggleSelectedFilter(e) {
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

    static createFilterListElements(data, listContainer) {
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
