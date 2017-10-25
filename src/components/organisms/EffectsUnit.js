import React from 'react';

const EffectsUnit = (props) => {
    let settings = Object.entries(props.settings)
        .filter(setting => setting[1] !== null);
    
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

            {settings.map(setting => (
                <p>{setting[0]}: {setting[1]}</p>
            ))}
        </div>
    );
};

export default EffectsUnit;