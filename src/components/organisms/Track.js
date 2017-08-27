import React from 'react';
import TrackControl from '../molecules/TrackControl';
import BeatGrid from '../molecules/BeatGrid';
import '../../styles/track.scss';

const Track = ({min, max, trackId, setTrackEffects, liveNode, recordStart, audioSrc, playing}) => {
    return (
        <div className="track">
            <TrackControl recordStart={recordStart} trackId={trackId} setTrackEffects={setTrackEffects} />
            <BeatGrid liveNode={liveNode} />
            {playing ? <audio autoPlay src={audioSrc}/> : <audio src={audioSrc}/>}
        </div>
    );
};

export default Track;