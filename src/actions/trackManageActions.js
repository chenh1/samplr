import 'whatwg-fetch';
import { apiPath } from '../apiPath';

export const addTrack = () => ({ type: 'ADD_TRACK' });

export const loadTracksSuccess = (tracks) => ({ type: 'TRACKS_LOADED', tracks });

export const loadTracks = () => (
    dispatch => {
        fetch(`${apiPath}tracks`).then(data => {
            return data.json();
        }).then(jsonData => {
            dispatch(loadTracksSuccess(jsonData));
        }).catch(error => {
            throw(error);
        });
    }
);

export const stopRecording = (clonedTrack, trackIndex) => ({
    type: 'STOP_RECORDING',
    clonedTrack,
    trackIndex
});