import { apiPath } from '../apiPath';

export const playProject = () => ({ type: 'PLAY_PROJECT' });
export const stopProject = () => ({ type: 'STOP_PROJECT' });
export const incrementLiveNode = () => ({ type: 'INCREMENT_LIVE_NODE' });
export const loopLiveNode = () => ({ type: 'LOOP_LIVE_NODE' });
export const recordStart = () => ({ type: 'RECORD_START' });
export const playProjectLiveDone = () => ({ type: 'PLAY_PROJECT_LIVE_DONE' });
export const greeting = (firstName) => ({ type: 'GREETING', firstName });
export const asyncGreetings = () => (
    dispatch => {
        fetch(`${apiPath}graphql?query={firstname}`).then(data => {
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
        fetch(`${apiPath}graphql?query=mutation{startPlay}`, {method:"POST"}).then(data => {
            return data.json();
        }).then(jsonData => {
            dispatch(playProject());
        });
    }
);

export const stopProjectLive = () => (
    dispatch => {
        fetch(`${apiPath}graphql?query=mutation{stopPlay}`, {method:"POST"}).then(data => {
            return data.json();
        }).then(jsonData => {
            dispatch(stopProject());
        });
    }
);