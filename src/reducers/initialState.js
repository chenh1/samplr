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
      {name: 'flanger'},
      {name: 'filter'}
    ]
  },
  effects: [
    {
      id: 0,
      trackId: 0,
      isSelected: true,
      type: 'delay',
      isOn: false, //false sets mix to zero
      order: 0,
      settings: {
        feedback: 0.8,
        time: 0.22,
        mix: 0.75
      }
    },
    {
      id: 2,
      trackId: 0,
      isSelected: false,
      type: 'chorus',
      isOn: false, //false sets mix to zero
      order: 1,
      settings: {
        feedback: 0.8,
        mix: 0.75
      }
    },
    {
      id: 1,
      trackId: 0,
      isSelected: false,
      type: 'slapback delay',
      isOn: false, //false sets mix to zero
      order: 0,
      settings: {
        feedback: 0.3,
        time: 0.85,
        mix: 0.45
      }
    },
    {
      id: 1,
      trackId: 1,
      isSelected: false,
      type: 'ping-pong delay',
      isOn: false, //false sets mix to zero
      order: 0,
      settings: {
        feedback: 0.3,
        time: 0.85,
        mix: 0.45
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

