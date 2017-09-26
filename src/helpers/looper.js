export const looper = (recorder, props, callback) => {
    if (props.session.liveNode < 3) {
        props.actions.incrementLiveNode();
    } else {
        props.actions.loopLiveNode();
        if (recorder && recorder.state !== "inactive") {
            recorder.stop();
        }
        callback();
    }
};