import React from 'react';

const EffectsUnit = (props) => {
    console.log(props);
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