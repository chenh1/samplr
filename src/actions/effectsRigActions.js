import * as types from './actionTypes';

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