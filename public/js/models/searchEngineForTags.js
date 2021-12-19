/**
 * Search functionnality
 *
 */

const searchEngineForTags = function (data, tags, type) {
    switch (type) {
        case 'ingredient':
            return data.filter((e) => e.ingredients.some((e) => e.ingredient.toLowerCase().includes(tags)));
        case 'machine':
            return data.filter((e) => e.appliance.toLowerCase().includes(tags));
        case 'ustensil':
            return data.filter((e) => e.ustensils.some((e) => e.includes(tags)));

        default:
            break;
    }
};

export default searchEngineForTags;
