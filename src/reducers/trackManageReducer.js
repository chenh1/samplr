import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function trackManageReducer(state = initialState.tracks, action) {
    let newState = [...state];

    switch (action.type) {
        case types.ADD_TRACK_SUCCESS:
            return newState;
        case types.DELETE_TRACK_SUCCESS:
            newState = newState.filter(track => {
                return track.id !== action.trackId
            });
            return newState;
        case types.TRACKS_LOADED:
            newState = [...newState, ...action.tracks];
            return newState;
        case types.STOP_RECORDING:
            newState = [
                ...newState.slice(0, action.trackIndex),
                action.clonedTrack, 
                ...newState.slice(action.trackIndex + 1),
            ];

            return newState;
        case types.AUDIO_DOWNLOADED:
            newState = newState.map(track => {
                let filtered = action.srcs.filter(src => {
                    return src.id === track.id
                });

                return filtered.length > 0 ? filtered[0] : track;
            });

            return newState;
        default:
            return state;
    }
}