import React from 'react';
import '../../styles/beatNode.scss';

const BeatNode = ({isLive}) => {
    const liveClass = isLive ? ' live' : '';

    return (
        <div>
            <button className={"beat-node" + liveClass}>BeatNode</button>
        </div>
    );
};

export default BeatNode;