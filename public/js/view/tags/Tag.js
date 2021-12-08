/**
 * Tags : create and manage filters tags
 */

export default class Tag {
    constructor(tagName, type) {
        this.tagName = tagName;
        this.type = type;
        this.tagContainer = document.querySelector('.taglist');

        this.render();
    }

    removeTag() {
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
