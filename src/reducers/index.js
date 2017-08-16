import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import {createSelector} from 'reselect';
import tracks from './trackManageReducer';
import visibleEffect from './effectsRigReducer';

const rootReducer = combineReducers({
    visibleEffect,
    tracks,
    routing: routerReducer
});

export const trackSelector = state => state.tracks;
export const trackIdSelector = state => state.visibleEffect.id;

export const getTrack = createSelector(
    trackSelector, trackIdSelector,
    (tracks, visibleEffectId) => {
        console.log('ran', tracks, visibleEffectId);
        return tracks.find(track => track.id === visibleEffectId)
    }
);

//Run this to see why reselect is optimal
export const getTrackNoReselect = state => {
    const tracks = trackSelector(state);
    const trackId = trackIdSelector(state);

    const track = tracks.find((track) => {
        return track.id === trackId;
    });
    console.log('ran');
    return track;
}

export default rootReducer;