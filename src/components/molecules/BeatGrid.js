import React from 'react';
import BeatNode from '../atoms/BeatNode';
import '../../styles/beatGrid.scss';
import '../../styles/styles.scss';

const BeatGrid = ({beats, liveNode}) => {
    const mockBeats = [1, 2, 3, 4];

    return (
        <div className="beat-grid right-rail">
            {mockBeats.map((beat, index) => {
                const isLive = liveNode === index;
                return (<BeatNode key={beat} isLive={isLive} />)
            })}
        </div>
    );
};

export default BeatGrid;