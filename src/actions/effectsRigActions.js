export function setTrackEffects(e) {
    console.log(e.target.value);
    return {
        type: 'SET_TRACK_EFFECTS',
        trackId: parseInt(e.target.value, 10)
    };
}

export function toggleReverb() {
    return {
        type: 'TOGGLE_REVERB'
    };
}

export function toggleReverbAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(toggleReverb());
        }, 1500);
    }

    /*
    return dispatch => {
        return fetch(url).then(data => {
            dispatch(toggleReverb());
        }).catch(error => {
            throw(error);
        });
    }
    */
}