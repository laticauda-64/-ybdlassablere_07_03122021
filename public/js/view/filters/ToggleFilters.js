/**
 * Show / Hide selected filter on clickÒ
 */

export default class ToggleFilters {
    constructor() {
        this.dom = {
            filterButtons: document.querySelectorAll('.filterOption'),
        };
    }

    detectClickOutside(e) {
        // if(document.queryCommandIndeterm){}
    }

    toggleSelectedFilter(e) {
        console.log(this);
        console.log(e);
        if ((e.target.nodeName === 'IMG' || e.target.nodeName === 'BUTTON') && this.classList.contains('open')) {
            this.classList.remove('open');
            return;
        }
        e.preventDefault();

        // if(e.target ===)

        document.querySelectorAll('.filterOption').forEach((e) => e.classList.remove('open'));
        this.classList.add('open');
        document.addEventListener('click', this.detectClickOutside);
    }

    init() {
        this.dom.filterButtons.forEach((e) => e.addEventListener('click', this.toggleSelectedFilter));
    }
}
