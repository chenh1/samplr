 import { combineReducers } from 'redux';
 import tracks from './trackManageReducer';
 import {routerReducer} from 'react-router-redux';

 const rootReducer = combineReducers({
     tracks,
     routing: routerReducer
 }); 

 export default rootReducer;