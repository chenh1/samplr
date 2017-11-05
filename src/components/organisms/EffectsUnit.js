import React from 'react';

const EffectsUnit = ({effectId, allSettings, type, isOn, changeSetting}) => {
    let settings = Object.entries(allSettings)
        .filter(setting => setting[1] !== null);
    
    return (
        <div>
            {type}
            {isOn}

            {settings.map((setting, index) => (
                <p key={'setting' + index}>
                    {setting[0]}: {setting[1]}
                    <input type="range" step="0.01" min="0" max="1" defaultValue={setting[1]}
                        data-setting={setting[0]}
                        data-effect-id={effectId} 
                        onMouseUp={changeSetting}/>
                </p>
            ))}
        </div>
    );
};

export default EffectsUnit;