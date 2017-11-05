import React from 'react';

const EffectsUnit = (props) => {
    let settings = Object.entries(props.settings)
        .filter(setting => setting[1] !== null);
    
    return (
        <div>
            {props.type}
            {props.isOn}

            {settings.map((setting, index) => (
                <p key={'setting' + index}>
                    {setting[0]}: {setting[1]}
                    <input type="range" step="0.01" min="0" max="1" defaultValue={setting[1]}/>
                </p>
            ))}
        </div>
    );
};

export default EffectsUnit;