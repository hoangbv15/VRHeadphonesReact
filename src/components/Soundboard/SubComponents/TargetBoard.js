/**
 * Created by Hoang Vu Bui.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';

class TargetBoard extends React.Component {
  constructor(props) {
    super(props);
  }
  updateCanvas() {
    var canvas = this.props.canvas;
    var texture = this.props.texture;
    if (canvas) {
      let context = canvas.getContext('2d');
      if (texture) {
        context.drawImage(texture, 0, 0, canvas.width, canvas.height);
      }
    }
  }
  render() {
    this.updateCanvas();
    return false;
  }
}

TargetBoard.propTypes = {
  texture: PropTypes.object,
  canvas: PropTypes.object,
};

export default TargetBoard;
