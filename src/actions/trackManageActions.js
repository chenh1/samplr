import 'whatwg-fetch';
import { apiPath } from '../apiPath';

export const addTrackSuccess = () => ({ type: 'ADD_TRACK_SUCCESS' });

export const addTrack = (sessionId) => (
    dispatch => {
        fetch(`${apiPath}graphql?query=mutation{createTrack(sessionid:${sessionId}){id}}`, {
            method:"POST"
        }).then(data => {
            return data.json();
        }).then(jsonData => {
            dispatch(addTrackSuccess())
        }).catch(error => {
            throw(error);
        })
    }
);

export const loadTracksSuccess = (tracks) => ({ type: 'TRACKS_LOADED', tracks });

export const loadTracks = () => (
    dispatch => {
        fetch(`${apiPath}graphql?query={getTracks{id,sessionid}}`).then(data => {
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