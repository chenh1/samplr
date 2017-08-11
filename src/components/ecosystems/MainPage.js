import React from 'react';
import {Link} from 'react-router';
import MainControls from '../organisms/MainControls';
import Track from '../organisms/Track';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {compose, pure} from 'recompose';
import * as actions from '../../actions/trackManageActions';

const MainPage = (props) => {
  return (
    <div>
      <h1>samplr</h1>

      <MainControls />

      {props.tracks.map((track, index) => {
        return (
          <Track key={track + index} />
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
    actions: bindActionCreators(actions, dispatch)
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure //once props grow, convert to onlyUpdateForKeys
)(MainPage);