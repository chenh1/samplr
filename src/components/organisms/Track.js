import React from 'react';
import TrackControl from '../molecules/TrackControl';
import BeatGrid from '../molecules/BeatGrid';

const TempoControl = ({min, max, trackId, setTrackEffects}) => {
    return (
        <div className="">
            <TrackControl trackId={trackId} setTrackEffects={setTrackEffects}/>
            <BeatGrid />
        </div>
    );
};

export default TempoControl;