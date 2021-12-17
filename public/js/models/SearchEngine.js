/**
 * Search functionnality
 *
 */

const searchEngine = function (data, inputText) {
    const result = [];

    for (let i = 0; i < data.length; i++) {
        if (
            data[i].name.toLowerCase().includes(inputText) ||
            data[i].description.toLowerCase().includes(inputText) ||
            data[i].appliance.toLowerCase().includes(inputText)
        ) {
            result.push(data[i]);
            continue;
        }

        // Ustensiles, string Array
        for (let j = 0; j < data[i].ustensils.length; j++) {
            if (data[i].ustensils[j].includes(inputText)) {
                result.push(data[i]);
                continue;
            }
        }

        // Ingredients, object Array
        for (let k = 0; k < data[i].ingredients.length; k++) {
            if (data[i].ingredients[k].ingredient.toLowerCase().includes(inputText)) {
                result.push(data[i]);
                continue;
            }
        }
    }

    return result;
};

export default searchEngine;
