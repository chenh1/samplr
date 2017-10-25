import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function effects(state = initialState.effects, action) {
    let newState = [...state];

    switch (action.type) {
        case types.EFFECT_SELECTED_FOR_EDIT:
            const { trackId, id } = action.effect;

            newState = newState.map(effect => {
                let isSelected = effect.trackId === trackId && effect.id === id;

                return Object.assign({}, effect, {isSelected});
            });

            return newState;
        case types.GET_EFFECTS_DONE:
            let fetchedEffects = action.effects.map(effect => {
                return {
                    id: effect.id,
                    trackId: effect.trackid,
                    type: effect.type,
                    isOn: effect.ison,
                    chainOrder: effect.chainorder,
                    isSelected: false,
                    settings: effect.settings
                }
            });

            return [...newState, ...fetchedEffects];
        default:
            return state;
    }
}