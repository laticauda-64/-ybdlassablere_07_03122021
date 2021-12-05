/**
 * Create Recipe card HTML
 */

export default class Recipe {
    constructor(element) {
        this.recipe = element;
    }

    extractIngredients(ingredients) {
        // let ingredientsList = '';
        // for (const e of ingredients) {
        //     ingredientsList += `<p><strong>${e.ingredient}:</strong> ${e.quantity} ${e.unit}</p>`;
        // }

        return ingredients.map((e) => `<p><strong>${e.ingredient}:</strong> ${e.quantity || ''} ${e.unit || ''}</p>`).join('');
    }

    create() {
        const { name, time, ingredients, description } = this.recipe;

        const html = `<article class="recipe">
                    <div class="recipe__cover"></div>
                    <div class="recipe__title">
                        <h2>${name}</h2>
                        <span class="recipe__time">${time} min</span>
                    </div>
                    
                    <div class="recipe__body">
                        <div class="recipe__body__ingredients">
                            ${this.extractIngredients(ingredients)}
                        </div>
                        <div class="recipe__body__instructions">
                            <p>
                            ${description}
                            </p>
                        </div>
                    </div>
                </article>`;

        return document.createRange().createContextualFragment(html);
    }
}
