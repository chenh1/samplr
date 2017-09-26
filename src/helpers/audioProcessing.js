export const processAudioCollection = (collection) => {
    return collection.map((file) => {
        let byteCharacters = atob(file.clip);
        let byteArrays = [];
        let sliceSize = 512;

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
            }
            
            const byteArray = new Uint8Array(byteNumbers);
            
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, {type: 'audio/x-mpeg-3'});

        let url = URL.createObjectURL(blob);

        return {
            id: file.trackid,
            src: url
        };
    });
}