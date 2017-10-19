import * as types from './actionTypes';

export const setTrackEffects = e => (
    { type: types.SET_TRACK_EFFECTS, trackId: parseInt(e.target.value, 10) }
);

export const effectSelectedForEdit = e => (
    { type: types.EFFECT_SELECTED_FOR_EDIT, effectId: parseInt(e.target.value, 10) }
); 