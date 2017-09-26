import { apiPath } from '../apiPath';
import { processAudioCollection } from '../helpers/audioProcessing';
import * as types from './actionTypes';

export const playProject = () => ({ type: types.PLAY_PROJECT });
export const stopProject = () => ({ type: types.STOP_PROJECT });
export const incrementLiveNode = () => ({ type: types.INCREMENT_LIVE_NODE });
export const loopLiveNode = () => ({ type: types.LOOP_LIVE_NODE });
export const recordStart = () => ({ type: types.RECORD_START });
export const playProjectLiveDone = () => ({ type: types.PLAY_PROJECT_LIVE_DONE });
export const downloadedAudio = srcs => ({ type: types.AUDIO_DOWNLOADED, srcs });

export const playProjectLive = () => (
    dispatch => {
        fetch(`${apiPath}graphql?query=mutation{startPlay}`, {
            method:"POST"
        }).then(data => {
            dispatch(playProjectLiveDone());
        }).catch(error => {
            throw(error);
        })
    }
);

export const stopProjectLive = () => {
    return (dispatch) => {
        fetch(`${apiPath}graphql?query=mutation{stopPlay}`, {
            method:"POST"
        }).then(data => {
            dispatch(stopProject());
        }).catch(error => {
            throw(error);
        });
    }
};

export const uploadFile = (formData, sessionId, trackId) => {
    return dispatch => {
        fetch(`${apiPath}graphql?query=mutation{uploadAudioFile(sessionid:${sessionId},trackid:${trackId}){id}}`, {
            method:"POST", 
            body: formData 
        }).then(data => {
            dispatch(stopProject());
            return data;
        })
    }
}

export const downloadAudio = (sessionId, id) => {
    return dispatch => {
        fetch(`${apiPath}graphql?query={getFiles(${id ? `id:${id}` : `sessionid:${sessionId}`}){clip,id,trackid}}`).then(data => {
            return data.json();
        }).then(res => {            
            dispatch(downloadedAudio(processAudioCollection(res.data.getFiles)));
        })
    }
}