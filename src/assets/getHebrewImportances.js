import { importances } from "./importances";


export function getHebrewImportances(englishImportance) {
    for (let importance of importances) {
        if (importance.id === englishImportance) {
            return importance.name;
        }
    }
    return ``;
} 