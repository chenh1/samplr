import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function effects(state = initialState.effects, action) {
    let newState = [...state];

    switch (action.type) {
        case types.EFFECT_SELECTED_FOR_EDIT:
            const { trackId, id } = action.effect;

            newState.forEach(effect => {
                effect.isSelected = effect.trackId === trackId && effect.id === id;
            });
            
            return newState;
        default:
            return state;
    }
}