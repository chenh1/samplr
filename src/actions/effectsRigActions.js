import { apiPath } from '../apiPath';
import * as types from './actionTypes';

export const getEffectsDone = () => (
    { type: types.GET_EFFECTS_DONE }
);

export const getSingleEffect = effectId => (
    dispatch => {
        fetch(`${apiPath}graphql?query={getEffects(id:${effectId}){id,trackid,type,ison,chainorder,settings{feedback,time,mix,speed,depth,lowGain,midLowGain,midHighGain,highGain,gain,decay,reverse,frequency,peak,distortion,threshold,ratio,pan}}}`).then(data => {
            console.log(data);
            return data.json();
        }).then(jsonData => {
            console.log(jsonData)
            dispatch(getEffectsDone(jsonData.data.getEffects));
        }).catch(error => {
            throw(error);
        })
    }
)

export const getAllEffects = sessionId => (
    dispatch => {
        fetch(`${apiPath}graphql?query={getEffects(sessionid:${sessionId}){id,trackid,type,ison,chainorder,settings{feedback,time,mix,speed,depth,lowGain,midLowGain,midHighGain,highGain,gain,decay,reverse,frequency,peak,distortion,threshold,ratio,pan}}}`).then(data => {
            return data.json();
        }).then(jsonData => {
            console.log(jsonData)
            dispatch(getEffectsDone(jsonData.data.getEffects));
        }).catch(error => {
            throw(error);
        })
    }
);

export const setTrackEffects = e => (
    { type: types.SET_TRACK_EFFECTS, trackId: parseInt(e.target.value, 10) }
);

export const effectSelectedForEdit = e => (
    { type: types.EFFECT_SELECTED_FOR_EDIT, 
        effect: 
        {
            id: parseInt(e.target.value, 10),
            trackId: parseInt(e.target.getAttribute('data-track-id'), 10)
        }
    }
);

export const effectAdded = () => ({ type: 'EFFECT_ADDED' });
export const addEffectToChain = (sessionId, trackId, chainOrder, type) => (
    dispatch => {
        fetch(`${apiPath}graphql?query=mutation{addEffect(sessionid:${sessionId},trackid:${trackId},ison:true,chainorder:${chainOrder},type:"${type}"){id}}`, {
            method:"POST"
        }).then(data => {
            dispatch(effectAdded());
        }).catch(error => {
            throw(error);
        })
    }
)