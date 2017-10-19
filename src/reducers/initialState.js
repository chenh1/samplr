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
    effectsSuite: [ //static data; only describes effects...
      {name: 'reverb'},
      {name: 'delay'},
      {name: 'multiBandEq'},
      {name: 'multiBandGain'}
    ]
  },
  effects: [
    {
      id: 0,
      trackId: 0,
      type: 'delay',
      isOn: false,
      order: 0,
      settings: {
        feedback: 0.8,
        time: 0.22,
        mix: 0.75
      }
    }
  ],
  tracks: [
    {
      id: 0,
      src: ''
    }
  ]
};
