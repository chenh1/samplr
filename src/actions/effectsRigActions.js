export function setTrackEffects(e) {
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
        }, 500);
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