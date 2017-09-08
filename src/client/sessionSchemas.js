import gql from 'graphql-tag';

const playState = gql`
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

export { playState, onPlayActive, onStopActive, onFileUploaded };