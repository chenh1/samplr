import React from 'react';
import '../../styles/styles.scss';

const TrackControl = ({trackId, setTrackEffects, recordStart}) => {
    return (
        <div className="left-rail">
            <button data-track-id={trackId} onClick={recordStart}>Record</button>
            <button value={trackId} onClick={setTrackEffects}>Effects</button>
        </div>
    );
};

export default TrackControl;