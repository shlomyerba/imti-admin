import { orientations } from "./orientation";


export function getHebrewOrientation(englishOrientation) {
    for (let orientation of orientations) {
        if (orientation.id === englishOrientation) {
            return orientation.name;
        }
    }
    return ``;
} 