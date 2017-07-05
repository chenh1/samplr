import React from 'react';
import Spinner from '../atoms/Spinner';

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