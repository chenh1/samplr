import React from 'react';
import { Spinner } from '../atoms';

const TempoControl = ({min, max, value}) => {
    return (
        <div className="">
            <span>Tempo:</span>    
            <Spinner min={min} max={max} value={value} />
        </div>
    );
};

export default TempoControl;