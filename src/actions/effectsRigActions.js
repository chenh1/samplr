import { apiPath } from '../apiPath';
import * as types from './actionTypes';

export const getAllEffectsDone = () => (
    { type: types.GET_ALL_EFFECTS_DONE }
);

export const getAllEffects = sessionId => (
    dispatch => {
        fetch(`${apiPath}graphql?query={getEffects(sessionid:${sessionId}){id,trackid,type,ison,chainorder,settings{feedback,time,mix,speed,depth,lowGain,midLowGain,midHighGain,highGain,gain,decay,reverse,frequency,peak,distortion,threshold,ratio,pan}}}`).then(data => {
            return data.json();
        }).then(jsonData => {
            console.log(jsonData)
            dispatch(getAllEffectsDone(jsonData.data.getEffects));
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

export const addEffectToChain = e => (
    { type: types.ADD_EFFECT_TO_CHAIN,
        effect:
        {
            type: e.target.getAttribute('data-type')
        } 
    }
)