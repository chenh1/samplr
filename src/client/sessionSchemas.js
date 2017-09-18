import gql from 'graphql-tag';

//need to add getfile at some point
const appState = gql`
  query {
    play
  }
`;

const tracksState = gql`
  query {
    getTracks(sessionid:1) {
      id
    }
  }
`

const onTrackAdded = gql`
  subscription {
    trackCreated
  }
`

const onPlayActive = gql`
  subscription {
    startPlayTriggered
  }
`

const onStopActive = gql`
  subscription {
    stopTriggered
  }
`

const onFileUploaded = gql`
  subscription {
    audioFileUploaded
  }
`

export { appState, onTrackAdded, tracksState, onPlayActive, onStopActive, onFileUploaded };