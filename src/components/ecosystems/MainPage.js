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
    this.recordTrack = this.recordTrack.bind(this);
    this.setLooper;
    this.recorder;
  }

  componentDidMount() {
    this.props.actions.loadTracks();
  }

  playProject() {
    const beatInterval = (60 / this.props.session.tempo) * 1000;

    this.props.actions.playProject();

    [].slice.call(document.querySelectorAll('audio')).forEach((track) => {
      if (track.getAttribute('src') !== '') {
        track.play();
      }
    })

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
    
    if (this.recorder && this.recorder.state !== "inactive") {
      console.log('stop recording!')
      this.recorder.stop();
    }
  }

  recordTrack(e) {
    const eventTrackId = parseInt(e.target.getAttribute('data-track-id'), 10);

    this.props.actions.recordStart();

    let audioChunks = [];

    navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.ondataavailable = e => {
          audioChunks.push(e.data);
          if (this.recorder.state == "inactive"){
            let blob = new Blob(audioChunks,{type:'audio/x-mpeg-3'});
            console.log('recorder stopped')
            this.props.actions.stopRecording(URL.createObjectURL(blob), eventTrackId);
          }
        }
        this.recorder.start();
      }).catch(e => console.log(e));
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
              audioSrc={track.src}
              recordStart={this.recordTrack}
              key={'track' + index} 
              trackId={track.id} 
              setTrackEffects={this.props.actions.setTrackEffects} 
              liveNode={this.props.session.liveNode}
              playing={this.props.session.play} />
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