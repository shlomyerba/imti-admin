import { status } from "./status";


export function getHebrewStatus(englishStatus) {
    for (let st of status) {
        if (st.id === englishStatus) {
            return st.name;
        }
    }
    return ``;
} 