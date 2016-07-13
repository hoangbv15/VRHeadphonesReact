import {
  DIRECTIONAL_TURN,
  SOUNDSOURCE_SELECTED,
  SOUNDSOURCE_MOVED_COMMIT,
  SOUNDSOURCE_MOVED_INTERIM,
  SOUNDSOURCE_DESELECTED,
  SOUNDSOURCE_DESELECT_ALL,
} from '../constants';

export function setTurnDirection(direction) {
  return {
    type: DIRECTIONAL_TURN,
    payload: {
      direction,
    },
  };
}

export function selectSoundSource(soundSourceId) {
  return {
    type: SOUNDSOURCE_SELECTED,
    payload: {
      soundSourceId,
    },
  };
}

export function deselectSoundSource(soundSourceId) {
  return {
    type: SOUNDSOURCE_DESELECTED,
    payload: {
      soundSourceId,
    },
  };
}

export function deselectAllSoundSources() {
  return {
    type: SOUNDSOURCE_DESELECT_ALL,
  };
}

export function moveSoundSource(deltaX, deltaY) {
  return {
    type: SOUNDSOURCE_MOVED_INTERIM,
    payload: {
      deltaX,
      deltaY,
    },
  };
}

export function commitMoveSoundSource(deltaX, deltaY) {
  return {
    type: SOUNDSOURCE_MOVED_COMMIT,
    payload: {
      deltaX,
      deltaY,
    },
  };
}
