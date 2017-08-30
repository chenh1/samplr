import React from 'react';
import TimeSignature from '../molecules/TimeSignature';
import TempoControl from '../molecules/TempoControl';
import Spinner from '../atoms/Spinner';

const MainControls = ({playProject, stopProject}) => {
    return (
        <div>
            <button onClick={playProject}>Play</button>
            <button onClick={stopProject}>Stop</button>
            <TimeSignature min="1" max="20" />
            <TempoControl min="1" max="300" value="120" />
        </div>
    );
};

export default MainControls;