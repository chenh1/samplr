import initialState from './initialState';

export function effectsRigReducer(state = initialState.effectsRig, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case 'SET_TRACK_EFFECTS':
            newState.id = action.trackId;
            return newState;
        case 'TOGGLE_REVERB':
            newState.counter++
            return newState;
        default:
            return state;
    }
}

export function effects(state = initialState.effects, action) {
    let newState = [...state];

    switch (action.type) {
        default:
            return state;
    }
}