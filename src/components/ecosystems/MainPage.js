import React from 'react';
import {Link} from 'react-router';
import MainControls from '../organisms/MainControls';
import Track from '../organisms/Track';
import EffectsRig from '../organisms/EffectsRig';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {compose, pure} from 'recompose';
import * as trackManageActions from '../../actions/trackManageActions';
import * as effectsRigActions from '../../actions/effectsRigActions';

const MainPage = (props) => {
  return (
    <div>
      <MainControls />

      <EffectsRig onClick={props.actions.toggleReverb}/>

      {props.tracks.map((track, index) => {
        return (
          <Track key={track + index} trackId={track.id} setTrackEffects={props.actions.setTrackEffects} />
        );
      })}
      
      <button onClick={props.actions.addTrack}>Add</button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    tracks: state.tracks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, trackManageActions, effectsRigActions), dispatch)
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure //once props grow, convert to onlyUpdateForKeys
)(MainPage);