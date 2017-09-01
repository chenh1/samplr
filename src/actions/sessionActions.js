export const playProject = () => ({ type: 'PLAY_PROJECT' });
export const stopProject = () => ({ type: 'STOP_PROJECT' });
export const incrementLiveNode = () => ({ type: 'INCREMENT_LIVE_NODE' });
export const loopLiveNode = () => ({ type: 'LOOP_LIVE_NODE' });
export const recordStart = () => ({ type: 'RECORD_START' });
export const playProjectLive = () => (
    dispatch => {
        //fetch('').then(data => {
        //  ensure all users return the request to play live
        //  dispatch(playProject());
        //});
        setTimeout(() => {
            dispatch(playProject());
        }, 1500);
    }
)