import React from 'react';
import '../../styles/styles.scss';

const TrackControl = ({trackId, setTrackEffects}) => {
    return (
        <div className="left-rail">
            <button>Record</button>
            <button value={trackId} onClick={setTrackEffects}>Effects</button>
        </div>
    );
};

export default TrackControl;