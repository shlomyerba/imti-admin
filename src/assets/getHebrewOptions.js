import { importances, orientations, status, votes, memberships } from "./staticOptions";



export function getHebrewImportances(englishImportance) {
    for (let importance of importances) {
        if (importance.id === englishImportance) {
            return importance.name;
        }
    }
    return ``;
}



export function getHebrewOrientation(englishOrientation) {
    for (let orientation of orientations) {
        if (orientation.id === englishOrientation) {
            return orientation.name;
        }
    }
    return ``;
}



export function getHebrewStatus(englishStatus) {
    for (let st of status) {
        if (st.id === englishStatus) {
            return st.name;
        }
    }
    return ``;
}



export function getHebrewVote(englishVote) {
    for (let vote of votes) {
        if (vote.id === englishVote) {
            return vote.name;
        }
    }
    return ``;
}

export function getHebrewMembership(englishMembership) {
    for (let membership of memberships) {
        if (membership.id === englishMembership) {
            return membership.name;
        }
    }
    return ``;
}