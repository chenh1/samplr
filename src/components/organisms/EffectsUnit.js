import React from 'react';

const EffectsUnit = (props) => {
    /*
        TODO:
        - Set filter/slider/spinners
        - Each filter to have effect id
        - Each filter to have key attribute to map to state
        - Each filter to have value to pass to state
    */
    return (
        <div>
            {props.type}
            {props.isOn}
            {props.settings.feedback}
            {props.settings.time}
            {props.settings.mix}
        </div>
    );
};

export default EffectsUnit;