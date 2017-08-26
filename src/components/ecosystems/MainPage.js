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

        <div>
          TEST AUDIO
          <audio id="testAudio" src="http://www.noiseaddicts.com/samples_1w72b820/4353.mp3" type="audio/mpeg" />
        </div>
        <div>
          TEST AUDIO 2
          <audio id="testAudio2" src="http://www.noiseaddicts.com/samples_1w72b820/4156.mp3" type="audio/mpeg" />
        </div>
        <div>
          TEST AUDIO 3
          <audio id="testAudio3" src="http://www.noiseaddicts.com/samples_1w72b820/4172.mp3" type="audio/mpeg" />
        </div>
        <div>
          TEST AUDIO 4
          <audio loop id="testAudio4" src="http://www.noiseaddicts.com/samples_1w72b820/3694.mp3" type="audio/mpeg" />
        </div>

        <EffectsRig onClick={this.props.actions.toggleReverbAsync}/>

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