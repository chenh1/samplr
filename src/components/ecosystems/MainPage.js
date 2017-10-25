import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, mapProps, withHandlers, pure } from 'recompose';
import { graphql } from 'react-apollo';
import { MainControls, Track } from '../organisms';
import { subscribeToAddTrack, subscribeToSessionPlay, subscribeToSessionStop, subscribeToDeleteTrack, subscribeToAudioUpload } from '../../client/subscriptions';
import { appState, tracksState, audioClipsState } from '../../client/sessionSchemas';
import EffectsRig from './EffectsRig';
import * as trackManageActions from '../../actions/trackManageActions';
import * as effectsRigActions from '../../actions/effectsRigActions';
import * as sessionActions from '../../actions/sessionActions';
import * as helpers from '../../helpers/looper';
import Pizzicato from 'pizzicato';

class MainPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.playProject = this.playProject.bind(this);
    this.stopProject = this.stopProject.bind(this);
    this.recordTrack = this.recordTrack.bind(this);
    this.playAllTracks = this.playAllTracks.bind(this);
    this.uploadAudio = this.uploadAudio.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.uploadFileToFetch = this.uploadFileToFetch.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.setupAudioClips = this.setupAudioClips.bind(this);
    this.setLooper;
    this.recorder;
    this.audioGroup;
    this.soundCollection;
  }

  componentWillMount() {
    const subscribeToMore = this.props.subscribeToMore;
    this.props.subscribeToSessionPlay(this.playProject, subscribeToMore);
    this.props.subscribeToSessionStop(this.stopProject, subscribeToMore);
    this.props.subscribeToAddTrack(this.props.actions.loadSingleTrack, subscribeToMore);
    this.props.subscribeToDeleteTrack(this.props.actions.deleteTrackSuccess, subscribeToMore);
    this.props.subscribeToAudioUpload(this.props.session.id, this.props.actions.downloadAudio, subscribeToMore);
  }

  componentDidMount() {
    this.props.actions.loadTracks(this.props.session.id);
    this.props.actions.downloadAudio(this.props.session.id);

    setTimeout(() => {
      this.setupAudioClips();
    }, 2000)
  }
  
  setupAudioClips() {
    this.soundCollection = this.props.tracks.map(track => {
      if (track.src) {
        return new Pizzicato.Sound(track.src);
      }
    }).filter(track => track !== undefined)

    this.audioGroup = new Pizzicato.Group(this.soundCollection);    
    //use this.audioGroup.addSound(mySound) to push new clips when done recording (.removeSound to delete)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.session.livePlay !== this.props.session.livePlay) {
      if (nextProps.session.livePlay) {
        this.playProject();
      } else {
        this.stopProject();
      }
    } 
  }

  addTrack() {
    let sessionId = this.props.session.id
    this.props.actions.addTrack(sessionId);
  }

  playAllTracks() {
    const delay = new Pizzicato.Effects.Delay({
      feedback: 0.8,
      time: 0.22,
      mix: 0.75
    });
    this.soundCollection[0].addEffect(delay);
    console.log(this.soundCollection);
    console.log(this.audioGroup);
    this.audioGroup.play();
  }

  playProject() {
    const beatInterval = (60 / this.props.session.tempo) * 1000;

    if (!this.props.session.play) {
      this.props.actions.playProject();
      this.playAllTracks();
      
      this.setLooper = setInterval(() => {
        helpers.looper(this.recorder, this.props, this.playAllTracks)
      }, beatInterval);
    }
  }

  stopProject() {
    if (this.props.session.play) {
      clearInterval(this.setLooper);
      this.props.actions.stopProjectLive();
      
      if (this.recorder && this.recorder.state !== "inactive") {
        this.recorder.stop();
      }
    }
  }

  stopRecording(url, trackId) {
    let trackIndex;
    let clonedTrack = this.props.tracks.filter((track, index) => {
      if (trackId === track.id) {
        trackIndex = index;
        return track;
      }
    });
    clonedTrack = Object.assign({}, clonedTrack[0], {src: url});
    this.props.actions.stopRecording(clonedTrack, trackIndex);
  }

  uploadFileToFetch(file, trackId) {
    let formData = new FormData();
    formData.append('attachment', file);
    this.props.actions.uploadFile(formData, this.props.session.id, trackId)
  }

  recordTrack(e) {
    const eventTrackId = parseInt(e.target.getAttribute('data-track-id'), 10);
    
    this.props.actions.recordStart();
    this.playProject();

    let audioChunks = [];

    navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.ondataavailable = e => {
          audioChunks.push(e.data);
          if (this.recorder.state == "inactive"){
            let blob = new Blob(audioChunks,{type:'audio/x-mpeg-3'});
            this.uploadFileToFetch(blob, eventTrackId);
            this.stopRecording(URL.createObjectURL(blob), eventTrackId);
          }
        }
        this.recorder.start();
      }).catch(e => console.log(e));
  }

  uploadAudio(e) {
    const file = e.target.files[0];
    this.props.actions.stopRecording(URL.createObjectURL(file), parseInt(e.target.getAttribute('data-track-id'), 10))
  }

  deleteTrack(e) {
    this.props.actions.deleteTrack(parseInt(e.target.getAttribute('data-track-id'), 10));
  }

  render() {
    return (
      <div>
        <MainControls playProjectLive={this.props.actions.playProjectLive} playProject={this.playProject} stopProject={this.stopProject}/>
        <EffectsRig />

        {this.props.tracks.map((track, index) => {
          return (
            <Track
              key={'track' + index} 
              uploadAudio={this.uploadAudio}
              audioSrc={track.src}
              recordStart={this.recordTrack}
              trackId={track.id} 
              setTrackEffects={this.props.actions.setTrackEffects} 
              liveNode={this.props.session.liveNode}
              playing={this.props.session.play}
              deleteTrack={this.deleteTrack} />
          );
        })}

        <button onClick={this.addTrack}>Add</button>
      </div>
    );
  }
};

function mapStateToProps(state) {
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
  graphql(appState),
  graphql(tracksState, {
    options: props => ({
      variables: {
        sessionid: props.session.id
      }
    })
  }),
  graphql(audioClipsState, {
    options: props => ({
      variables: {
        sessionid: props.session.id
      }
    })
  }),
  mapProps(({data, ...props}) => ({
    subscribeToMore: data && data.subscribeToMore,
    subscribeToSessionPlay,
    subscribeToSessionStop,
    subscribeToAddTrack,
    subscribeToDeleteTrack,
    subscribeToAudioUpload,
    ...props
  })),
  pure
)(MainPage);