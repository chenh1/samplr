import initialState from './initialState';

export default function trackManageReducer(state = initialState.tracks, action) {
    let newState = [...state];

    switch (action.type) {
        case 'ADD_TRACK_SUCCESS':
            newState = [...newState, state[0]]; 
            return newState;
        case 'DELETE_TRACK_SUCCESS':
            newState = newState.filter((track) => {
                return track.id !== action.trackId
            });
            return newState;
        case 'TRACKS_LOADED':
        console.log(action.tracks)
            newState = [...newState, ...action.tracks];
            return newState;
        case 'STOP_RECORDING':
            newState = [
                ...newState.slice(0, action.trackIndex),
                action.clonedTrack, 
                ...newState.slice(action.trackIndex + 1),
            ];

            return newState;
        default:
            return state;
    }
}