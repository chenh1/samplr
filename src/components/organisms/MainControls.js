import React from 'react';
import TimeSignature from '../molecules/TimeSignature';
import TempoControl from '../molecules/TempoControl';
import Spinner from '../atoms/Spinner';

const MainControls = ({}) => {
    return (
        <div>
            <button>Start</button>
            <button>Stop</button>
            <TimeSignature min="1" max="20" />
            <TempoControl min="1" max="300" />
        </div>
    );
};

export default MainControls;