import initialState from './initialState';

export default function trackManageReducer(state = initialState.session, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case 'PLAY_PROJECT':
            newState.play = true;
            newState.liveNode = 0;
            return newState;
        case 'STOP_PROJECT':
            newState.play = false;
            newState.liveNode = -1;
            return newState;
        case 'INCREMENT_LIVE_NODE':
            newState.liveNode++;
            return newState;
        case 'LOOP_LIVE_NODE':
            newState.liveNode = 0;
            return newState;
        case 'RECORD_START':
            newState.recording = true;
            return newState;
        case 'GREETING':
            newState.firstName = action.firstName;
            return newState;
        default:
            return state;
    }
}