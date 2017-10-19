import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import {createSelector} from 'reselect';
import tracks from './trackManageReducer';
import effectsRig from './effectsRigReducer';
import effects from './effectsEntryReducer';
import session from './sessionReducer';
import { ApolloClient, ApolloProvider } from 'react-apollo';

export const client = new ApolloClient();

const rootReducer = combineReducers({
    effectsRig,
    effects,
    tracks,
    session,
    apollo: client.reducer(),
    routing: routerReducer
});

export const trackSelector = state => state.tracks;
export const trackIdSelector = state => state.effectsRig.id;
export const effectsSelector = state => state.effects;

export const getTrack = createSelector(
    trackSelector, trackIdSelector,
    (tracks, effectsRigId) => {
        return tracks.find(track => track.id === effectsRigId)
    }
);

export const getTrackEffects = createSelector(
    effectsSelector, trackIdSelector,
    (effects, effectsRigId) => {
        return effects.filter(effect => effect.trackId === effectsRigId)
    }
)

export const getSelectedEffect = createSelector(
    getTrackEffects,
    effects => effects.find(effect => effect.isSelected) || effects[0]
);

export default rootReducer;