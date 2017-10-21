import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function effects(state = initialState.effects, action) {
    let newState = [...state];

    switch (action.type) {
        case types.EFFECT_SELECTED_FOR_EDIT:
            const { trackId, id } = action.effect;

            let selectedEffect = newState.filter(effect => (
                effect.trackId === trackId && effect.id === id
            ))[0];

            let newEffect = Object.assign({}, selectedEffect, {isSelected: true});

            let newerState = newState.filter(effect => (
                effect.id !== id
            ));

            return [...newerState, newEffect];
        case types.ADD_EFFECT_TO_CHAIN:
            return newState;
        default:
            return state;
    }
}