import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function trackManageReducer(state = initialState.session, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case types.PLAY_PROJECT:
            newState.play = true;
            newState.liveNode = 0;
            return newState;
        case types.PLAY_PROJECT_LIVE_DONE:
            newState.livePlay = true;
            return newState;
        case types.STOP_PROJECT:
            newState.livePlay = false;
            newState.play = false;
            newState.liveNode = -1;
            return newState;
        case types.INCREMENT_LIVE_NODE:
            newState.liveNode++;
            return newState;
        case types.LOOP_LIVE_NODE:
            newState.liveNode = 0;
            return newState;
        case types.RECORD_START:
            newState.recording = true;
            return newState;
        case types.DOWNLOADED:
            newState.testSrc = action.src;
            return newState;
        default:
            return state;
    }
}