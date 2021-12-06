/**
 * This function Help to split big Class in multiples files
 * containing diferents functions
 */

function BindToClass(functionsObject, thisClass) {
    for (let [functionKey, functionValue] of Object.entries(functionsObject)) {
        thisClass[functionKey] = functionValue.bind(thisClass);
    }
}
