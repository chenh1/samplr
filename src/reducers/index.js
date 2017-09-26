import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import {createSelector} from 'reselect';
import tracks from './trackManageReducer';
import visibleEffect from './effectsRigReducer';
import session from './sessionReducer';
import { ApolloClient, ApolloProvider } from 'react-apollo';

export const client = new ApolloClient();

const rootReducer = combineReducers({
    visibleEffect,
    tracks,
    session,
    apollo: client.reducer(),
    routing: routerReducer
});

export const trackSelector = state => state.tracks;
export const trackIdSelector = state => state.visibleEffect.id;

export const getTrack = createSelector(
    trackSelector, trackIdSelector,
    (tracks, visibleEffectId) => {
        return tracks.find(track => track.id === visibleEffectId)
    }
);

export default rootReducer;