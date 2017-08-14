import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {compose, pure} from 'recompose';
import * as actions from '../../actions/effectsRigActions';
import {getTrack} from '../../reducers';

const EffectsRig = (props) => {
    return (
        <div>
            <p>Track No: {props.track.id}</p>
            <p>Divisions: {props.track.divisions}</p>
            <button onClick={props.actions.toggleReverbAsync}>Trigger change</button>
            <p>Reverb toggled {props.counter} times</p>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        track: getTrack(state),
        counter: state.visibleEffect.counter
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