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
        console.log(`${apiPath}graphql?query=mutation{startPlay}`)
        fetch(`${apiPath}graphql?query=mutation{startPlay}`, {
            method:"POST"
        }).then(data => {
            return data.json();
        }).then(jsonData => {
            dispatch(playProjectLiveDone());
        });
    }
);

export const stopProjectLive = () => {
    let formData = new FormData();
    formData.append('data', JSON.stringify({foo:'bar'}));

    return (dispatch) => {
        fetch(`${apiPath}graphql?query=mutation{stopPlay}`, {
            method:"POST",
            body: formData
        }).then(data => {
            return data.json();
        }).then(jsonData => {
            dispatch(stopProject());
        });
    }
};

export const uploadFile = (formData) => {
    return dispatch => {
        fetch(`${apiPath}graphql?query=mutation{uploadAudioFile{originalname,mimetype}}`, {
            method:"POST", 
            body: formData 
        }).then(data => {
            console.log(data);
            dispatch(stopProject());
            return data;
        })
    }
}

export const dummyAction = () => ({type: 'DUMMY'})
export const downloadedAudio = (file) => {
    return {type:'DOWNLOADED', file};
}
export const downloadAudio = () => {
    return dispatch => {
        fetch(`${apiPath}graphql?query={getfile{clip,id}}`).then(data => {
            console.log(data);
            return data.json();
        }).then(res=> {
            console.log(res);
            let blob = new Blob(res.data.getfile.clip, {type:'qudio/x-mpeg-3'});
            console.log(blob);
            dispatch(dummyAction());
        })
    }
}