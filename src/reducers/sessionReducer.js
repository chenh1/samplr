import initialState from './initialState';

export default function trackManageReducer(state = initialState.session, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case 'PLAY_PROJECT':
            newState.play = true;
            return newState;
        default:
            return state;
    }
}