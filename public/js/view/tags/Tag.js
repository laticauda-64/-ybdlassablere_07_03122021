/**
 * Tags : create and manage filters tags
 */

import hydrateFilters from '../../models/hydrateFilters.js';
import searchEngine from '../../models/searchEngine.js';
import DisplayRecipes from '../DisplayRecipes.js';

export default class Tag {
    constructor(tagName, type) {
        this.tagName = tagName;
        this.type = type;
        this.tagContainer = document.querySelector('.taglist');

        // Prevent from adding the same tag in list
        if (GlobalStore.currentTagList.includes(this.tagName)) return;

        // Filter Store & add tag to the dom
        this.filterDataStore();
        this.render();
    }

    filterDataStore() {
        GlobalStore.dataWithFilters = searchEngine(
            GlobalStore.dataWithFilters.length > 0 ? GlobalStore.dataWithFilters : GlobalStore.rawData,
            this.tagName
        );

        // Add filter to the list of current filters
        GlobalStore.currentTagList.push(this.tagName);

        // Hydrate page
        new DisplayRecipes(GlobalStore.dataWithFilters);
        hydrateFilters(GlobalStore.dataWithFilters);
    }

    removeTag() {
        // Remove tag from list of current filters
        GlobalStore.currentTagList = GlobalStore.currentTagList.filter((e) => e != this.parentNode.innerText.trim().toLowerCase());

        // Refresh data in store
        if (GlobalStore.currentTagList.length > 0) {
            for (let i = 0; i < GlobalStore.currentTagList.length; i++) {
                if (i === 0) {
                    GlobalStore.dataWithFilters = searchEngine(GlobalStore.rawData, GlobalStore.currentTagList[i]);
                }
                GlobalStore.dataWithFilters = searchEngine(GlobalStore.dataWithFilters, GlobalStore.currentTagList[i]);
            }
        } else {
            if (GlobalStore.searchBoxFilter.length > 0) {
                GlobalStore.dataWithFilters = [...GlobalStore.searchBoxFilter];
            } else {
                GlobalStore.dataWithFilters = [...GlobalStore.rawData];
            }
        }

        // Refresh page
        new DisplayRecipes(GlobalStore.dataWithFilters);
        hydrateFilters(GlobalStore.dataWithFilters);

        // Remove tag from dom
        this.parentNode.remove();
    }

    render() {
        const color = this.type === 'ingredient' ? 'blue' : this.type === 'machine' ? 'green' : 'red';
        let newNode = document.createElement('div');
        const html = `
        <span class="tag tag--${color}">
            ${this.tagName}
                <button class="tag--closeIcon">
                    <img src="public/img/closeIcon.svg" alt="Retirer le tag">
                </button>
        </span>`;
        newNode.innerHTML = html;
        newNode = newNode.firstElementChild;

        // Add event listener on button to remove tag on click
        newNode.querySelector('.tag--closeIcon').addEventListener('click', this.removeTag);

        this.tagContainer.appendChild(newNode);
    }
}
