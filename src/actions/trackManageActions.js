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

export const loadTracks = (sessionId) => (
    dispatch => {
        fetch(`${apiPath}graphql?query={getTracks(sessionid:${sessionId}){id,sessionid}}`).then(data => {
            return data.json();
        }).then(jsonData => {
            dispatch(loadTracksSuccess(jsonData.data.getTracks));
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

export const deleteTrackSuccess = (trackId) => ({ TYPE: 'DELETE_TRACK_SUCCESS', trackId })

export const deleteTrack = (trackId) => (
    dispatch => {
        fetch(`${apiPath}graphql?query=mutation{deleteTrack(trackid:${trackId}){id}}`, {
            method:"POST"
        }).then(data => {
            return data.json();
        }).then(jsonData => {
            dispatch(deleteTrackSuccess(trackId))
        }).catch(error => {
            throw(error);
        })
    }
)