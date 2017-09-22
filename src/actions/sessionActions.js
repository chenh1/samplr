import { apiPath } from '../apiPath';

export const playProject = () => ({ type: 'PLAY_PROJECT' });
export const stopProject = () => ({ type: 'STOP_PROJECT' });
export const incrementLiveNode = () => ({ type: 'INCREMENT_LIVE_NODE' });
export const loopLiveNode = () => ({ type: 'LOOP_LIVE_NODE' });
export const recordStart = () => ({ type: 'RECORD_START' });
export const playProjectLiveDone = () => ({ type: 'PLAY_PROJECT_LIVE_DONE' });

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

export const uploadFile = (formData, sessiondId, trackId) => {
    return dispatch => {
        fetch(`${apiPath}graphql?query=mutation{uploadAudioFile(sessionid:${sessionId},trackid:${trackId}){originalname,mimetype}}`, {
            method:"POST", 
            body: formData 
        }).then(data => {
            console.log(data);
            dispatch(stopProject());
            return data;
        })
    }
}

export const downloadedAudio = (srcs) => {
    return {type:'AUDIO_DOWNLOADED', srcs};
}

export const downloadAudio = (sessionId) => {
    return dispatch => {
        fetch(`${apiPath}graphql?query={getfiles(sessionid:${sessionId}){clip,id,trackid}}`).then(data => {
            console.log(data);
            return data.json();
        }).then(res => {
            console.log(res);
            const srcs = res.data.getfiles.map((file) => {
                let byteCharacters = atob(file.clip);
                let byteArrays = [];
                let sliceSize = 512;

                for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    const slice = byteCharacters.slice(offset, offset + sliceSize);
                    
                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                    }
                    
                    const byteArray = new Uint8Array(byteNumbers);
                    
                    byteArrays.push(byteArray);
                }

                const blob = new Blob(byteArrays, {type: 'audio/x-mpeg-3'});

                let url = URL.createObjectURL(blob);
                console.log(blob);

                return {
                    id: file.trackid,
                    src: url
                };
            });
            dispatch(downloadedAudio(srcs));
        })
    }
}

/*
export const downloadAudio = () => {
    return dispatch => {
        fetch(`${apiPath}graphql?query={getfile{clip,id}}`).then(data => {
            console.log(data);
            return data.json();
        }).then(res=> {
            console.log(res);
            let byteCharacters = atob(res.data.getfile.clip);
            let byteArrays = [];
            let sliceSize = 512;

            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                const slice = byteCharacters.slice(offset, offset + sliceSize);
                
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
                }
                
                const byteArray = new Uint8Array(byteNumbers);
                
                byteArrays.push(byteArray);
            }

            const blob = new Blob(byteArrays, {type: 'audio/x-mpeg-3'});

            let url = URL.createObjectURL(blob);
            console.log(blob);
            dispatch(downloadedAudio(url));
        })
    }
}
*/