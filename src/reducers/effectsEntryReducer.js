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
        case types.ADD_EFFECT_TO_CHAIN:
            return newState;
        default:
            return state;
    }
}