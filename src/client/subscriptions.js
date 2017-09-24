import { appState, tracksState, audioClipsState, onTrackAdded, onTrackDeleted, onPlayActive, onStopActive, onFileUploaded } from '../client/sessionSchemas';

export const subscribeToSessionPlay = (callback, subscribeToMore) => (
    subscribeToMore({
        document: onPlayActive,
        onError: e => console.error('Error: ', e),
        updateQuery: () => callback()
    })
);

export const subscribeToSessionStop = (callback, subscribeToMore) => (
    subscribeToMore({
        document: onStopActive,
        onError: e => console.error('Error: ', e),
        updateQuery: () => callback()
    })
);

export const subscribeToAddTrack = (callback) => (
    subscribeToMore({
        document: onTrackAdded,
        onError: e => console.error('Error: ', e),
        updateQuery: (previousResult, results) => ( 
            callback(results.subscriptionData.data.trackCreated)
        )
    })
)

export const subscribeToDeleteTrack = (callback) => (
    subscribeToMore({
        document: onTrackDeleted,
        onError: e => console.error('Error: ', e),
        updateQuery: (previousResult, results) => (
            callback(results.subscriptionData.data.trackDeleted)
        )
    })
);
 
export const subscribeToAudioUpload = (callback) => (
    subscribeToMore({
        document: onFileUploaded,
        onError: e => console.error('Error: ', e),
        updateQuery: (previousResult, results) => (
            callback(props.session.id, results.subscriptionData.data.audioFileUploaded)
        )
    })
);