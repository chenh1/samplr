import React from 'react';
import TrackControl from '../molecules/TrackControl';
import BeatGrid from '../molecules/BeatGrid';
import '../../styles/track.scss';

const Track = ({min, max, trackId, setTrackEffects, liveNode, recordStart}) => {
    return (
        <div className="track">
            <TrackControl recordStart={recordStart} trackId={trackId} setTrackEffects={setTrackEffects} />
            <BeatGrid liveNode={liveNode} />
        </div>
    );
};

export default Track;