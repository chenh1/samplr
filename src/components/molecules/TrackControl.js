import React from 'react';

const TrackControl = ({trackId, setTrackEffects}) => {
    return (
        <div className="">
            <button>Record</button>
            <button value={trackId} onClick={setTrackEffects}>Effects</button>
        </div>
    );
};

export default TrackControl;