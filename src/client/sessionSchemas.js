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
`

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