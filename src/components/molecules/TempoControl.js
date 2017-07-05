import React from 'react';
import Spinner from '../atoms/Spinner';

const TempoControl = ({min, max}) => {
    return (
        <div className="">
            <span>Tempo:</span>    
            <Spinner min={min} max={max} />
        </div>
    );
};

export default TempoControl;