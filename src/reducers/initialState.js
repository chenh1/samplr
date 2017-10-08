export default {
  session: {
    firstName: '',
    livePlay: false,
    play: false,
    recording: false,
    tempo: 120,
    liveNode: -1, //not live
    testSrc: '',
    id: 1
  },
  effectsRig: {
    id: 0,
    counter: 0,
    effectsSuite: [
      {name: 'reverb'},
      {name: 'delay'},
      {name: 'multiBandEq'},
      {name: 'multiBandGain'}
    ]
  },
  tracks: [
    {
      id: 0,
      src: ''
    }
  ]
};
