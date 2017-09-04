export const playProject = () => ({ type: 'PLAY_PROJECT' });
export const stopProject = () => ({ type: 'STOP_PROJECT' });
export const incrementLiveNode = () => ({ type: 'INCREMENT_LIVE_NODE' });
export const loopLiveNode = () => ({ type: 'LOOP_LIVE_NODE' });
export const recordStart = () => ({ type: 'RECORD_START' });
export const greeting = (firstName) => ({ type: 'GREETING', firstName });
export const asyncGreetings = () => (
    dispatch => {
        fetch('http://localhost:4000/graphql?query={firstname}').then(data => {
            console.log('retrieve ', data);
            return data.json();
        }).then(jsonData => {
            console.log(jsonData.data.firstname);
            dispatch(greeting(jsonData.data.firstname));
        }).catch(error => {
            throw(error);
        });
    }
);

export const playProjectLive = () => (
    dispatch => {
        fetch('http://localhost:4000/graphql?query=mutation{startPlay}', {method:"POST"}).then(data => {
            return data.json();
        }).then(jsonData => {
            console.log(jsonData);
            dispatch(playProject());
        });
    }
);

export const stopProjectLive = () => (
    dispatch => {
        fetch('http://localhost:4000/graphql?query=mutation{stopPlay}', {method:"POST"}).then(data => {
            return data.json();
        }).then(jsonData => {
            console.log(jsonData);
            dispatch(stopProject());
        });
    }
);