/**
 * Created by Hoang Vu Bui.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Soundboard.css';

import _ from 'lodash';

import { ANGLE_TURN_SENSITIVITY } from '../../constants'
import preload from './preloader';
import { backgroundImg, arrowImg, circleImg } from './assets';
import {
  Arrow,
  TargetBoard,
  SoundSource,
  SelectionRectangle
} from './SubComponents';

import {
  setTurnDirection,
  selectSoundSource,
  moveSoundSource,
  commitMoveSoundSource,
  deselectSoundSource,
  deselectAllSoundSources,
} from '../../actions/soundboardActions';

let imgAssets = {
  background: { src: backgroundImg },
  arrow: { src: arrowImg },
  circle: { src: circleImg },
};

const initialState = {
  canvas: null,
  angle: 0,
  assets: imgAssets,
  dragStartX: null,
  dragStartY: null,
  dragCurrentX: null,
  dragCurrentY: null,
};

class Soundboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.isDragging = false;
    this.isDragSelecting = false;
  }
  componentDidMount() {
    this.key = require('keymaster');
    this.key('a, left', this.handleKeyDown.left);
    this.key('d, right', this.handleKeyDown.right);

    imgAssets = preload(imgAssets, () => {
      this.setState({ canvas: this.refs.canvas, assets: imgAssets });
    });
    // this.refs.rect.rotate(45);
  }
  componentWillUnmount() {
    this.key.unbind('a, left', this.handleKeyDown.left);
    this.key.unbind('d, right', this.handleKeyDown.right);
  }
  handleKeyDown = {
    left: () => {
      this.props.dispatch(setTurnDirection(-ANGLE_TURN_SENSITIVITY));
    },
    right: () => {
      this.props.dispatch(setTurnDirection(ANGLE_TURN_SENSITIVITY));
    },
    mouseDown: (e) => {
      let pos = this.handleKeyDown.getMousePos(e);

      this.isDragging = true;
      this.setState({
        dragStartX: pos.x,
        dragStartY: pos.y,
      });

      let selectedIndex = this.getSoundSourceOnPosition(pos.x, pos.y);

      if (selectedIndex < 0) {
        if(!this.key.shift) {
          this.props.dispatch(deselectAllSoundSources());
        }
        this.isDragSelecting = true;
      } else if (this.key.shift) {
        if (!this.props.soundSources[selectedIndex].selected) {
          this.props.dispatch(selectSoundSource(selectedIndex));
        }
        else {
          this.props.dispatch(deselectSoundSource(selectedIndex));
        }
      } else {
        if (!this.props.soundSources[selectedIndex].selected) {
          this.props.dispatch(deselectAllSoundSources());
          this.props.dispatch(selectSoundSource(selectedIndex));
        }
      }
    },
    mouseUp: (e) => {
      // Commit mouse move into history
      if (this.isDragging && !this.isDragSelecting) {
        let pos = this.handleKeyDown.getMousePos(e);
        let delta = this.getRelativeDeltas(pos.x - this.state.dragStartX, pos.y - this.state.dragStartY);
        this.props.dispatch(commitMoveSoundSource(delta.x, delta.y));
      }

      this.setState({
        dragStartX: null,
        dragStartY: null,
        dragCurrentX: null,
        dragCurrentY: null,
      });
      this.isDragging = false;
      this.isDragSelecting = false;
    },
    mouseMove: (e) => {
      if (this.isDragging) {
        let pos = this.handleKeyDown.getMousePos(e);
        if (this.isDragSelecting) {
          let dragCurrentX = pos.x;
          let dragCurrentY = pos.y;
          let dragStartX = this.state.dragStartX;
          let dragStartY = this.state.dragStartY;

          this.setState({ dragCurrentX: pos.x, dragCurrentY: pos.y });
          // Select the sounds that are within the drag selection
          for (let i = 0; i < this.props.soundSources.length; i++) {
            let relPos = this.props.soundSources[i];
            let abPos = this.getAbsolutePosition(relPos.x, relPos.y);

            if (Math.min(dragCurrentX, dragStartX) < abPos.x && abPos.x < Math.max(dragCurrentX, dragStartX) &&
              Math.min(dragCurrentY, dragStartY) < abPos.y && abPos.y < Math.max(dragCurrentY, dragStartY)) {
              this.props.dispatch(selectSoundSource(i));
            }
          }
          return;
        }
        let delta = this.getRelativeDeltas(pos.x - this.state.dragStartX, pos.y - this.state.dragStartY);
        this.setState({ dragStartX: pos.x, dragStartY: pos.y });
        this.props.dispatch(moveSoundSource(delta.x, delta.y));
      }
    },
    getMousePos: (e) => {
      console.log(e);
      const clientX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX,
            clientY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;
      let rect = this.refs.canvas.getBoundingClientRect();
      return {
        x: (clientX - rect.left) / (rect.right - rect.left) * this.refs.canvas.width,
        y: (clientY - rect.top) / (rect.bottom - rect.top) * this.refs.canvas.height
      };
    }
  }
  getSoundSourceOnPosition(x, y) {
    for (let i = 0; i < this.props.soundSources.length; i++) {
      let pos = this.props.soundSources[i];
      let abPos = this.getAbsolutePosition(pos.x, pos.y);
      if (Math.abs(x - abPos.x) < this.state.assets.circle.width / 2 && Math.abs(y - abPos.y) < this.state.assets.circle.height / 2)
        return i;
    }
    return -1;
  }
  getAbsolutePosition(x, y) {
    return {
      x: (1 - x) * this.refs.canvas.width / 2,
      y: (1 - y) * this.refs.canvas.height / 2
    }
  }
  getRelativeDeltas(deltaX, deltaY) {
    return {
      x: deltaX * 2 / this.refs.canvas.width,
      y: deltaY * 2 / this.refs.canvas.height
    }
  }
  render() {
    return (
      <div ref="containerDOM"
        onMouseDown={this.handleKeyDown.mouseDown}
        onMouseUp={this.handleKeyDown.mouseUp}
        onMouseMove={this.handleKeyDown.mouseMove}
        onTouchStart={this.handleKeyDown.mouseDown}
        onTouchMove={this.handleKeyDown.mouseMove}
        onTouchEnd={this.handleKeyDown.mouseUp}
      >
        <canvas ref="canvas" width={500} height={500}>
        </canvas>
        <TargetBoard
          canvas={this.state.canvas}
          texture={this.state.assets.background}
        />
        <Arrow
          canvas={this.state.canvas}
          angle={this.props.angle}
          texture={this.state.assets.arrow}
        />
        {this.props.soundSources.map((source, i) =>
          <SoundSource
            key={i}
            number={i}
            canvas={this.state.canvas}
            texture={this.state.assets.circle}
            text={source.text}
            x={source.x}
            y={source.y}
            selected={source.selected}
          />
        )}
        <SelectionRectangle
          canvas={this.state.canvas}
          dragStartX={this.state.dragStartX}
          dragStartY={this.state.dragStartY}
          dragCurrentX={this.state.dragCurrentX}
          dragCurrentY={this.state.dragCurrentY}
        />
      </div>
    );
  }
}

Soundboard.propTypes = {
  className: PropTypes.string,
  angle: PropTypes.number.isRequired,
  soundSources: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const SoundboardApp = connect()(Soundboard);

export default withStyles(s)(SoundboardApp);
