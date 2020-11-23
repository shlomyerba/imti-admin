import { votes } from "./votes";


export function getHebrewVote(englishVote) {
    for (let vote of votes) {
        if (vote.id === englishVote) {
            return vote.name;
        }
    }
    return ``;
} 