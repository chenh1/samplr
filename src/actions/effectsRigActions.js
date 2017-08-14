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