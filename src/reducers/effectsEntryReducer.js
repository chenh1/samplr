import initialState from './initialState';

export default function effects(state = initialState.effects, action) {
    let newState = [...state];

    switch (action.type) {
        default:
            return state;
    }
}