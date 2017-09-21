import initialState from './initialState';

export default function trackManageReducer(state = initialState.tracks, action) {
    let newState = [...state];

    switch (action.type) {
        case 'ADD_TRACK_SUCCESS':
            return newState;
        case 'DELETE_TRACK_SUCCESS':
            newState = newState.filter(track => {
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
        case 'AUDIO_DOWNLOADED':
            newState = newState.map(track => {
                let filtered = action.srcs.filter(src => {
                    console.log('src', src)
                    return src.id === track.id
                });
                console.log(filtered.length > 0 ? filtered[0] : track);
                return filtered.length > 0 ? filtered[0] : track;
            });
            console.log(newState);
            return newState;
        default:
            return state;
    }
}