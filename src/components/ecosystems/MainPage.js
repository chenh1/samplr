import React from 'react';
import { Link } from 'react-router';
import { MainControls, Track, HeadRail, EffectsRig } from '../organisms';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, mapProps, withHandlers, pure } from 'recompose';
import { appState, tracksState, onTrackAdded, onPlayActive, onStopActive, onFileUploaded } from '../../client/sessionSchemas';
import { graphql } from 'react-apollo';
import * as trackManageActions from '../../actions/trackManageActions';
import * as effectsRigActions from '../../actions/effectsRigActions';
import * as sessionActions from '../../actions/sessionActions';

class MainPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.playProject = this.playProject.bind(this);
    this.stopProject = this.stopProject.bind(this);
    this.recordTrack = this.recordTrack.bind(this);
    this.playAllTracks = this.playAllTracks.bind(this);
    this.uploadAudio = this.uploadAudio.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.produceBlob = this.produceBlob.bind(this);
    this.uploadFileToFetch = this.uploadFileToFetch.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.setLooper;
    this.recorder;
  }

  componentWillMount() {
    console.log('mounted')
    this.props.subscribeToSessionPlay(this.playProject);
    this.props.subscribeToSessionStop(this.stopProject);
    this.props.subscribeToAddTrack(this.props.actions.loadSingleTrack);
    //this.props.subscribeToAudioStream(this.produceBlob);
  }

  componentDidMount() {
    this.props.actions.loadTracks(this.props.session.id);
    this.props.actions.downloadAudio(this.props.session.id);
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
    [].slice.call(document.querySelectorAll('audio')).forEach((track) => {
      if (track.getAttribute('src') !== '') {
        track.play();
      }
    })
  }

  playProject() {
    const beatInterval = (60 / this.props.session.tempo) * 1000;

    if (!this.props.session.play) {
      this.props.actions.playProject();
      this.playAllTracks();
      
      this.setLooper = setInterval(() => {
        if (this.props.session.liveNode < 3) {
          this.props.actions.incrementLiveNode();
        } else {
          this.props.actions.loopLiveNode();
          if (this.recorder && this.recorder.state !== "inactive") {
            this.recorder.stop();
          }
          this.playAllTracks();
        }
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
    this.props.actions.uploadFile(formData, trackId)
  }

  produceBlob(data) {
    console.log(data);
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
          console.log(e.data);
          audioChunks.push(e.data);
          if (this.recorder.state == "inactive"){
            console.log('audiochunks: ', audioChunks);
            let blob = new Blob(audioChunks,{type:'audio/x-mpeg-3'});
            console.log('blob that was made: ', blob);
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
        <EffectsRig onClick={this.props.actions.toggleReverbAsync}/>
        <HeadRail />

        {this.props.tracks.map((track, index) => {
          return (
            <Track
              uploadAudio={this.uploadAudio}
              audioSrc={track.src}
              recordStart={this.recordTrack}
              key={'track' + index} 
              trackId={track.id} 
              setTrackEffects={this.props.actions.setTrackEffects} 
              liveNode={this.props.session.liveNode}
              playing={this.props.session.play}
              deleteTrack={this.deleteTrack} />
          );
        })}

        <button onClick={this.props.actions.downloadAudio}>TEST DOWNLOAD TRACK</button>
        <audio src={this.props.session.testSrc}></audio>

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
    options: (props) => ({
      variables: {
        sessionid: props.session.id
      }
    })
  }),
  mapProps(({data, ...props}) => {
    const subscribeToMore = data && data.subscribeToMore;
    return {
      subscribeToSessionPlay: (callback) => { //TODO: MOVE THESE TO SERVICES
        return subscribeToMore({
          document: onPlayActive,
          onError: (e) => {
            return console.error('Error: ', e)
          },
          updateQuery: () => {  
            callback();
          }
        })
      },
      subscribeToSessionStop: (callback) => {
        return subscribeToMore({
          document: onStopActive,
          onError: (e) => {
            return console.error('Error: ', e)
          },
          updateQuery: () => {  
            callback();
          }
        })
      },
      subscribeToAddTrack: (callback) => {
        return subscribeToMore({
          document: onTrackAdded,
          onError: (e) => {
            return console.error('Error: ', e)
          },
          updateQuery: (previousResult, results) => { 
            console.log('prev & next: ', previousResult, results) 
            callback(results.subscriptionData.data.trackCreated);
          }
        })
      },
      subscribeToAudioStream: (callback) => {
        return subscribeToMore({
          document: onFileUploaded,
          onError: (e) => {
            return console.error('Error: ', e)
          },
          updateQuery: (previousResult, {fetchMoreResult}) => {
            console.log('fetch more? ', previousResult, fetchMoreResult)
            callback(fetchMoreResult);
          }
        })
      },
      ...props
    }
  }),
  pure
)(MainPage);