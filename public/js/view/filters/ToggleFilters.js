/**
 * Show / Hide selected filter on click
 */

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

        document.querySelectorAll('.filterOption').forEach((e) => e.addEventListener('click', this.toggleSelectedFilter));
    }

    toggleSelectedFilter(e) {
        const currentFilter = e.target.closest('.filterOption');

        // Close current filter if click on the arrow detected
        if ((e.target.nodeName === 'IMG' || e.target.nodeName === 'BUTTON') && currentFilter.classList.contains('open')) {
            currentFilter.classList.remove('open');
            return;
        }
        // Close all the filters in case other are open
        document.querySelectorAll('.filterOption').forEach((e) => e.classList.remove('open'));

        // Finally open the current one
        currentFilter.classList.add('open');

        // And add a EventListenner on the document to detect 'outside' click
        document.documentElement.addEventListener('click', window.clickOutSide);
    }
}
