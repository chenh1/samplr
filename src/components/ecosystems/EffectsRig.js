import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {compose, pure} from 'recompose';
import * as actions from '../../actions/effectsRigActions';
import { getTrack, getTrackEffects, getSelectedEffect, sessionIdSelector } from '../../reducers';
import { EffectsUnit } from '../organisms';

class EffectsRig extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.actions.getAllEffects(this.props.sessionId);
    }

    render(){
        return (
            <div>
                <p>Track No: {this.props.track.id}</p>
                <p>Add an effect:</p>
                {this.props.effectsSuite.map((effect, index) => (
                    <button 
                        onClick={this.props.actions.addEffectToChain} 
                        data-type={effect.name}
                        key={index}>
                            {effect.name}
                    </button>
                ))}

                <div>
                    This track's added effects:
                    {this.props.effectsEntries.map((entry, index) => (
                        <button 
                            key={index}
                            data-track-id={entry.trackId}
                            onClick={this.props.actions.effectSelectedForEdit}  
                            value={entry.id}>
                                {entry.type}
                        </button>
                    ))}
                </div>

                <EffectsUnit {...this.props.selectedEffect}/>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        sessionId: sessionIdSelector(state),
        track: getTrack(state),
        effectsSuite: state.effectsRig.effectsSuite,
        effectsEntries: getTrackEffects(state),
        selectedEffect: getSelectedEffect(state)
    };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure
)(EffectsRig);