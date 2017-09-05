export default window.location.hostname === 'localhost' ?
    window.location.protocol + '//' + window.location.hostname + ':4000/' :
    window.location.protocol + '//desolate-peak-60507.herokuapp.com/';