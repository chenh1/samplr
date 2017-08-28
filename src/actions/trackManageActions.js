import 'whatwg-fetch';

export const addTrack = () => ({ type: 'ADD_TRACK' });

export const loadTracksSuccess = (tracks) => ({ type: 'TRACKS_LOADED', tracks });

export const loadTracks = () => (
    dispatch => {
        fetch('https://desolate-peak-60507.herokuapp.com/tracks').then(data => {
            return data.json();
        }).then(jsonData => {
            dispatch(loadTracksSuccess(jsonData));
        }).catch(error => {
            throw(error);
        });
    }
);

export const stopRecording = (audioSrc, trackId) => ({
    type: 'STOP_RECORDING',
    audioSrc,
    trackId
});