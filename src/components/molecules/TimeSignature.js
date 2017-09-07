import React from 'react';
import { Spinner } from '../atoms';

const TimeSignature = ({min, max}) => {
    return (
        <div className="">
            <Spinner min={min} max={max} />
            {" / "}
            <Spinner min={min} max={max} />
        </div>
    );
};

export default TimeSignature;