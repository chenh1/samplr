import React from 'react';
import TrackControl from '../molecules/TrackControl';
import BeatGrid from '../molecules/BeatGrid';

const TempoControl = ({min, max}) => {
    return (
        <div className="">
            <TrackControl />
            <BeatGrid />
        </div>
    );
};

export default TempoControl;