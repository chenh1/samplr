export function playProject() {
    return {
        type: 'PLAY_PROJECT'
    };
}

export function stopProject() {
    return {
        type: 'STOP_PROJECT'
    };
}

export function incrementLiveNode() {
    return {
        type: 'INCREMENT_LIVE_NODE'
    }
}

export function loopLiveNode() {
    return {
        type: 'LOOP_LIVE_NODE'
    }
}
