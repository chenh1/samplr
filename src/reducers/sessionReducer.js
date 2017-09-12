import initialState from './initialState';

export default function trackManageReducer(state = initialState.session, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case 'PLAY_PROJECT':
            newState.play = true;
            newState.liveNode = 0;
            return newState;
        case 'PLAY_PROJECT_LIVE_DONE':
            newState.livePlay = true;
            return newState;
        case 'STOP_PROJECT':
            newState.livePlay = false;
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
        case 'DOWNLOADED':
            console.log(action.src);
            newState.testSrc = action.src;
            return newState;
        default:
            return state;
    }
}