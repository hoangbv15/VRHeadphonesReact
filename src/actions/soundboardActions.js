import {
  DIRECTIONAL_TURN,
  SOUNDSOURCE_SELECTED,
  SOUNDSOURCE_MOVED,
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
    type: SOUNDSOURCE_MOVED,
    payload: {
      deltaX,
      deltaY,
    },
  };
}
