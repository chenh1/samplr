import gql from 'graphql-tag';

const appState = gql`
  query {
    play
    getfile
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
`

const onFileUploaded = gql`
  subscription {
    audioFileUploaded
  }
`

export { appState, onPlayActive, onStopActive, onFileUploaded };