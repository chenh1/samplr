import initialState from './initialState';

export default function trackManageReducer(state = initialState.tracks, action) {
    let newState = [...state];

    switch (action.type) {
        case 'ADD_TRACK':
            newState = [...newState, {
                id: state.length,
                divisions: 4 //@todo CHANGE 4 TO BPM WHEN LOGIC IS IMPLEMENTED
            }]; 
            return newState;
        case 'TRACKS_LOADED':
            newState = [...newState, ...action.tracks];
            return newState;
        case 'STOP_RECORDING':
            console.log(action.trackId)
            newState[parseInt(action.trackId, 10)].src = action.audioSrc;
            return newState;
        default:
            return state;
    }
}