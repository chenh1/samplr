import initialState from './initialState';

export default function trackManageReducer(state = initialState.tracks, action) {
    let newState;

    switch (action.type) {
        case 'ADD_TRACK':
            newState = [...state, 1]; //@todo CHANGE 1 TO AN OBJECT REPRESENTING A TRACK
            return newState;
        default:
            return state;
    }
}