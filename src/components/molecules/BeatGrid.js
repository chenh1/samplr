import React from 'react';
import BeatNode from '../atoms/BeatNode';

const TempoControl = ({beats}) => {
    const mockBeats = [1, 2, 3, 4];

    return (
        <div className="">
            {mockBeats.map(beat => {
                return (<BeatNode key={beat} />)
            })}
        </div>
    );
};

export default TempoControl;