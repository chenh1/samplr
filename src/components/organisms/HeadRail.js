import React from 'react';
import '../../styles/headRail.scss';
import '../../styles/styles.scss';

const HeadRail = ({}) => {
    const mockNodes = [1, 2, 3, 4];

    return (
        <div className="head-rail">
            <div className="left-rail">
            </div>
            <div className="node-grid right-rail">
                {mockNodes.map(node => {
                    return (
                        <div>
                            <button className="beat-marker">Marker</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HeadRail;