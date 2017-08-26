import React from 'react';
import BeatNode from '../atoms/BeatNode';
import '../../styles/beatGrid.scss';
import '../../styles/styles.scss';

const BeatGrid = ({beats}) => {
    const mockBeats = [1, 2, 3, 4];

    return (
        <div className="beat-grid right-rail">
            {mockBeats.map(beat => {
                return (<BeatNode key={beat} />)
            })}
        </div>
    );
};

export default BeatGrid;