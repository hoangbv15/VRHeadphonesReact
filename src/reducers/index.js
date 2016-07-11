import { combineReducers } from 'redux';
import runtime from './runtime';
import soundboardReducer from './soundboardReducer';

export default combineReducers({
  runtime,
  soundboardReducer,
});
