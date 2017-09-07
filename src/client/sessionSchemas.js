import gql from 'graphql-tag';

const playState = gql`
  query {
    play
  }
`;

const onPlayStateChanged = gql`
  subscription {
    startPlayTriggered
  }
`;

export { playState, onPlayStateChanged };