import React from 'react';
import {Link} from 'react-router';
import MainControls from '../organisms/MainControls';
import Track from '../organisms/Track';
import HeadRail from '../organisms/HeadRail';
import EffectsRig from '../organisms/EffectsRig';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {compose, pure} from 'recompose';
import * as trackManageActions from '../../actions/trackManageActions';
import * as effectsRigActions from '../../actions/effectsRigActions';

class MainPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.loadTracks();
  }

  render() {
    return (
      <div>
        <MainControls />
        <EffectsRig onClick={this.props.actions.toggleReverbAsync}/>
        <HeadRail />
        {this.props.tracks.map((track, index) => {
          return (
            <Track key={'track' + index} trackId={track.id} setTrackEffects={this.props.actions.setTrackEffects} />
          );
        })}
        
        <button onClick={this.props.actions.addTrack}>Add</button>
      </div>
    );
  }
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