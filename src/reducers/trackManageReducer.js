import initialState from './initialState';

export default function trackManageReducer(state = initialState.tracks, action) {
    let newState;

    switch (action.type) {
        case 'ADD_TRACK':
            newState = [...state, {
                id: state.length,
                divisions: 4 //@todo CHANGE 4 TO BPM WHEN LOGIC IS IMPLEMENTED
            }]; 
            return newState;
        case 'TRACKS_LOADED':
            newState = [...state, ...action.tracks];
            return newState;
        case 'STOP_RECORDING':
            newState = state.slice();
            console.log(action.trackId)
            newState[parseInt(action.trackId, 10)].src = action.audioSrc;
            return newState;
        default:
            return state;
    }
}