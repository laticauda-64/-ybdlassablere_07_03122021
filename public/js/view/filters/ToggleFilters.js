/**
 * Show / Hide selected filter on clickÒ
 */

export default class ToggleFilters {
    constructor() {
        this.dom = {
            filterButtons: document.querySelectorAll('.filterOption'),
        };
    }

    toggleSelectedFilter(e) {
        console.log(e);
        if ((e.target.nodeName === 'IMG' || e.target.nodeName === 'BUTTON') && this.classList.contains('open')) {
            this.classList.remove('open');
            return;
        }
        e.preventDefault();

        document.querySelectorAll('.filterOption').forEach((e) => e.classList.remove('open'));
        this.classList.add('open');

        document.documentElement.addEventListener('click', (e) => {
            if (!this.contains(e.target)) {
                this.classList.remove('open');
                return;
            }
        });
    }

    init() {
        this.dom.filterButtons.forEach((e) => e.addEventListener('click', this.toggleSelectedFilter));
    }
}
