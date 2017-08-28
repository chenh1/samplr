export const setTrackEffects = (e) => ({ type: 'SET_TRACK_EFFECTS', trackId: parseInt(e.target.value, 10) });
export const toggleReverb = () => ({ type: 'TOGGLE_REVERB' });
export const toggleReverbAsync = () => (
    dispatch => {
        setTimeout(() => {
            dispatch(toggleReverb());
        }, 1500);
    }
)