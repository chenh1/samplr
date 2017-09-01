import React from 'react';
import TimeSignature from '../molecules/TimeSignature';
import TempoControl from '../molecules/TempoControl';
import Spinner from '../atoms/Spinner';

const MainControls = ({playProjectLive, playProject, stopProject}) => {
    return (
        <div>
            <button onClick={playProjectLive}>Play Live</button>
            <button onClick={playProject}>Private Play</button>
            <button onClick={stopProject}>Stop</button>
            <TimeSignature min="1" max="20" />
            <TempoControl min="1" max="300" value="120" />
        </div>
    );
};

export default MainControls;