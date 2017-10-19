import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {compose, pure} from 'recompose';
import * as actions from '../../actions/effectsRigActions';
import {getTrack} from '../../reducers';
import { EffectsUnit } from '../organisms';

const EffectsRig = (props) => {
    return (
        <div>
            <p>Track No: {props.track.id}</p>
            <p>Add an effect:</p>
            {props.effectsSuite.map(effect => (
                <button>{effect.name}</button>
            ))}

            
            <EffectsUnit />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        track: getTrack(state),
        counter: state.effectsRig.counter,
        effectsSuite: state.effectsRig.effectsSuite,
        effectsEntries: state.effects //build selector to retrieve entries relevant to track only
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