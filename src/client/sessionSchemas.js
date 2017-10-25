import gql from 'graphql-tag';

export const appState = gql`
  query {
    play
  }
`;

export const tracksState = gql`
  query ($sessionid: Int, $id: Int) {
    getTracks(sessionid: $sessionid, id: $id) {
      id
    }
  }
`;

export const audioClipsState = gql`
  query ($sessionid: Int, $id: Int) {
    getFiles(sessionid: $sessionid, id: $id) {
      id
    }
  }
`;

export const effectState = gql`
  query ($sessionid: Int) {
    getEffects(sessionid: $sessionid) {
      id
      trackid
      type
      ison
      chainorder
      settings {
        feedback
        time
        mix
        speed
        depth
        lowGain
        midLowGain
        midHighGain
        highGain
        gain
        decay
        reverse
        frequency
        peak
        distortion
        threshold
        ratio
        pan
      }
    }
  }
`;

export const onTrackAdded = gql`
  subscription {
    trackCreated
  }
`;

export const onTrackDeleted = gql`
  subscription {
    trackDeleted
  }
`;

export const onPlayActive = gql`
  subscription {
    startPlayTriggered
  }
`;

export const onStopActive = gql`
  subscription {
    stopTriggered
  }
`;

export const onFileUploaded = gql`
  subscription {
    audioFileUploaded
  }
`;

export const onEffectAdded = gql`
  subscription {
    effectAdded
  }
`;