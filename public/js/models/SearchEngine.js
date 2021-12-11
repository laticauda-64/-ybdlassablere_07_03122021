/**
 * Search functionnality
 *
 */

const searchEngine = function (data, inputText) {
    return data.filter(
        (e) =>
            e.name.toLowerCase().includes(inputText) ||
            e.description.toLowerCase().includes(inputText) ||
            e.ingredients.some((e) => e.ingredient.toLowerCase().includes(inputText))
    );
};

export default searchEngine;
