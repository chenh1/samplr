import React from 'react';
import { TrackControl, BeatGrid } from '../molecules';
import '../../styles/track.scss';

const Track = ({min, max, trackId, setTrackEffects, liveNode, recordStart, audioSrc, playing, deleteTrack, uploadAudio}) => {
    return (
        <div className="track">
            <TrackControl deleteTrack={deleteTrack} uploadAudio={uploadAudio} recordStart={recordStart} trackId={trackId} setTrackEffects={setTrackEffects} />
            <BeatGrid liveNode={liveNode} />
            {playing ? <audio autoPlay src={audioSrc}/> : <audio src={audioSrc}/>}
        </div>
    );
};

export default Track;