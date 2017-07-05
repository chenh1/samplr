import React from 'react';

const Spinner = ({min, max}) => {
    return (
        <input type="number" min={min} max={max} />
    );
};

export default Spinner;