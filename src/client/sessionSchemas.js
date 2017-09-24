import gql from 'graphql-tag';

//need to add getfile at some point
const appState = gql`
  query {
    play
  }
`;

const tracksState = gql`
  query ($sessionid: Int, $id: Int) {
    getTracks(sessionid: $sessionid, id: $id) {
      id
    }
  }
`;

const audioClipsState = gql`
  query ($sessionid: Int, $id: Int) {
    getFiles(sessionid: $sessionid, id: $id) {
      id
    }
  }
`

const onTrackAdded = gql`
  subscription {
    trackCreated
  }
`;

const onTrackDeleted = gql`
  subscription {
    trackDeleted
  }
`;

const onPlayActive = gql`
  subscription {
    startPlayTriggered
  }
`;

const onStopActive = gql`
  subscription {
    stopTriggered
  }
`;

const onFileUploaded = gql`
  subscription {
    audioFileUploaded
  }
`;

export { appState, audioClipsState, onTrackAdded, onTrackDeleted, tracksState, onPlayActive, onStopActive, onFileUploaded };