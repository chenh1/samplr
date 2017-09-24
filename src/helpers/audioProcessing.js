export const setLooper = () => (
    setInterval(() => {

    })
)

export const processAudioChunks = (recorder, uploadFileFunction, stopRecordingFunction, trackId) => {
    console.log('started');
    let audioChunks = [];

    navigator.mediaDevices.getUserMedia({ audio: true }).then(
        stream => {
            console.log('in stream')
            recorder = new MediaRecorder(stream);        
            recorder.ondataavailable = e => {
                audioChunks.push(e.data);
                console.log(audioChunks)
                if (recorder.state === 'inactive') {
                    let blob = new Blob(audioChunks,{type:'audio/x-mpeg-3'});
                    uploadFileFunction(blob, trackId);
                    stopRecordingFunction(URL.createObjectURL(blob), trackId);
                }
            }
            recorder.start();
        }
    ).catch(e => console.log(e));
};