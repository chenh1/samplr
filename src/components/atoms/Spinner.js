import React from 'react';

const Spinner = ({min, max, value}) => {
    return (
        <input type="number" min={min} max={max} value={value} />
    );
};

export default Spinner;