const apiPath = window.location.hostname === 'localhost' ?
    window.location.protocol + '//' + window.location.hostname + ':4000/' :
    window.location.protocol + '//desolate-peak-60507.herokuapp.com/';

const subscriptionPath = window.location.hostname === 'localhost' ?
    'ws://' + window.location.hostname + ':4000/' :
    'wss://desolate-peak-60507.herokuapp.com/';

//const apiPath = window.location.protocol + '//desolate-peak-60507.herokuapp.com/';
//const subscriptionPath = 'ws://desolate-peak-60507.herokuapp.com/';

export { apiPath, subscriptionPath };