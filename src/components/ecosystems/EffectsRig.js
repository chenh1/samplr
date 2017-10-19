import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {compose, pure} from 'recompose';
import * as actions from '../../actions/effectsRigActions';
import { getTrack, getTrackEffects, getSelectedEffect } from '../../reducers';
import { EffectsUnit } from '../organisms';

const EffectsRig = (props) => {
    return (
        <div>
            <p>Track No: {props.track.id}</p>
            <p>Add an effect:</p>
            {props.effectsSuite.map((effect, index) => (
                <button key={index}>{effect.name}</button>
            ))}

            {props.effectsEntries.map((entry, index) => (
                <p key={index}>{entry.type}</p>
            ))}
            <EffectsUnit settings={props.selectedEffect}/>
        </div>
    );
};

function mapStateToProps(state) {
    return {
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