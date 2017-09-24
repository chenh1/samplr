//import 'whatwg-fetch';
import { apiPath } from '../apiPath';
import * as types from './actionTypes';

export const addTrackSuccess = () => ({ type: types.ADD_TRACK_SUCCESS });
export const loadTracksSuccess = tracks => ({ type: types.TRACKS_LOADED, tracks });
export const stopRecording = (clonedTrack, trackIndex) => ({
    type: types.STOP_RECORDING,
    clonedTrack,
    trackIndex
});
export const deleteTrackSuccess = trackId => ({ type: types.DELETE_TRACK_SUCCESS, trackId });

export const addTrack = (sessionId) => (
    dispatch => {
        fetch(`${apiPath}graphql?query=mutation{createTrack(sessionid:${sessionId}){id}}`, {
            method:"POST"
        }).then(data => {
            return data.json();
        }).then(jsonData => {
            console.log(jsonData)
            dispatch(addTrackSuccess())
        }).catch(error => {
            throw(error);
        })
    }
);

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

export const loadSingleTrack = (trackId) => (
    dispatch => {
        fetch(`${apiPath}graphql?query={getTracks(id:${trackId}){id,sessionid}}`).then(data => {
            return data.json();
        }).then(jsonData => {
            dispatch(loadTracksSuccess(jsonData.data.getTracks));
        }).catch(error => {
            throw(error);
        });
    }
);

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
);