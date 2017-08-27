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
import * as sessionActions from '../../actions/sessionActions';

class MainPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.playProject = this.playProject.bind(this);
    this.stopProject = this.stopProject.bind(this);
    this.setLooper;
  }

  componentDidMount() {
    this.props.actions.loadTracks();
  }

  playProject() {
    const beatInterval = (60 / this.props.session.tempo) * 1000;

    this.props.actions.playProject();

    this.setLooper = setInterval(() => {
      if (this.props.session.liveNode < 3) {
        this.props.actions.incrementLiveNode();
      } else {
        this.props.actions.loopLiveNode();
      }
    }, beatInterval);
  }

  stopProject() {
    clearInterval(this.setLooper);
    this.props.actions.stopProject();
  }

  render() {
    return (
      <div>
        <MainControls playProject={this.playProject} stopProject={this.stopProject}/>
        <EffectsRig onClick={this.props.actions.toggleReverbAsync}/>
        <HeadRail />

        {this.props.tracks.map((track, index) => {
          return (
            <Track 
              recordStart={this.props.actions.recordStart}
              key={'track' + index} 
              trackId={track.id} 
              setTrackEffects={this.props.actions.setTrackEffects} 
              liveNode={this.props.session.liveNode}/>
          );
        })}
        
        <button onClick={this.props.actions.addTrack}>Add</button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  console.log(state);
  return {
    session: state.session,
    tracks: state.tracks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(
      {}, 
      trackManageActions, 
      effectsRigActions,
      sessionActions
    ), dispatch)
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure //once props grow, convert to onlyUpdateForKeys
)(MainPage);