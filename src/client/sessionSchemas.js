import gql from 'graphql-tag';

//need to add getfile at some point
const appState = gql`
  query {
    play
    
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