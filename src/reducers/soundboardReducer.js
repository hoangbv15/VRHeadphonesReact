import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import {
  DIRECTIONAL_TURN,
  SOUNDSOURCE_SELECTED,
  SOUNDSOURCE_MOVED_INTERIM,
  SOUNDSOURCE_MOVED_COMMIT,
  SOUNDSOURCE_DESELECTED,
  SOUNDSOURCE_DESELECT_ALL,
} from '../constants';

const initialState = {
  angle: 0,
  soundSources: [
    {
      text: 'test1.wav',
      x: 0.02393341,
      y: 0.8847737,
      selected: true,
    },
    {
      text: 'test2longnameaheadwithlotsoftext.wav',
      x: 0.015608728,
      y: 0.5720165,
      selected: false,
    },
  ],
};

function directionalTurn(state = initialState, action) {
  switch (action.type) {
    case DIRECTIONAL_TURN:
      return Object.assign({}, state, {
        angle: state.angle + action.payload.direction,
      });
    case SOUNDSOURCE_SELECTED:
      return Object.assign({}, state, {
        soundSources: state.soundSources.map((s, index) => {
          if (index !== action.payload.soundSourceId) {
            return s;
          }
          return Object.assign({}, s, {
            selected: true,
          });
        }),
      });
    case SOUNDSOURCE_DESELECTED:
      return Object.assign({}, state, {
        soundSources: state.soundSources.map((s, index) => {
          if (index !== action.payload.soundSourceId) {
            return s;
          }
          return Object.assign({}, s, {
            selected: false,
          });
        }),
      });
    case SOUNDSOURCE_DESELECT_ALL:
      return Object.assign({}, state, {
        soundSources: state.soundSources.map(s => (
          Object.assign({}, s, {
            selected: false,
          }))
        ),
      });
    case SOUNDSOURCE_MOVED_COMMIT:
    case SOUNDSOURCE_MOVED_INTERIM:
      return Object.assign({}, state, {
        soundSources: state.soundSources.map(s => {
          if (!s.selected) {
            return s;
          }
          return Object.assign({}, s, {
            x: s.x - action.payload.deltaX,
            y: s.y - action.payload.deltaY,
          });
        }),
      });
    default:
      return state;
  }
}

const soundboardReducer = combineReducers({
  directionalTurn: undoable(directionalTurn, {
    limit: 100, // set a limit for the history
    filter: includeAction([SOUNDSOURCE_MOVED_COMMIT]),
  }),
});

export default soundboardReducer;
