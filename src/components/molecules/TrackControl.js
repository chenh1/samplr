import React from 'react';
import '../../styles/styles.scss';

const TrackControl = ({trackId, setTrackEffects, recordStart, uploadAudio, deleteTrack}) => {
    return (
        <div className="left-rail">
            <button data-track-id={trackId} onClick={deleteTrack}>DELETE</button>
            <button data-track-id={trackId} onClick={recordStart}>Record</button>
            <input onChange={uploadAudio} data-track-id={trackId} type="file" accept="audio/*" capture="microphone" id="recorder" />
            <button value={trackId} onClick={setTrackEffects}>Effects</button>
        </div>
    );
};

export default TrackControl;