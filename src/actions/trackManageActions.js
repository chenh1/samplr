import 'whatwg-fetch';

export function addTrack() {
    return {
        type: 'ADD_TRACK'
    };
}

export function loadTracksSuccess(tracks) {
    return {
        type: 'TRACKS_LOADED',
        tracks
    };
}

export function loadTracks() {
    console.log('load tracks')
    return dispatch => {
        fetch('https://desolate-peak-60507.herokuapp.com/tracks').then(data => {
            return data.json();
        }).then(jsonData => {
            dispatch(loadTracksSuccess(jsonData));
        }).catch(error => {
            throw(error);
        });
    };
}