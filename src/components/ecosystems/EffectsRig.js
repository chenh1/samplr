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
            {props.effectsSuite.map(effect => (
                <button>{effect.name}</button>
            ))}
            
        </div>
    );
};

function mapStateToProps(state) {
    return {
        track: getTrack(state),
        counter: state.effectsRig.counter,
        effectsSuite: state.effectsRig.effectsSuite
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