/**
 * Created by Hoang Vu Bui.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';

class Arrow extends React.Component {
  constructor(props) {
    super(props);
  }
  updateCanvas() {
    var canvas = this.props.canvas;
    var texture = this.props.texture;
    if (canvas) {
      let context = canvas.getContext('2d');
      if (texture) {
        // draw arrow
        var arrowWidth = texture.width;// * canvas.width / this.props.backgroundWidth;
        var arrowHeight = texture.height;// * canvas.height / this.props.backgroundHeight;

        // save the unrotated context of the canvas so we can restore it later
        // the alternative is to untranslate & unrotate after drawing
        context.save();

        // move to the center of the canvas
        context.translate(canvas.width / 2, canvas.height / 2);

        // rotate the canvas to the specified radians
        context.rotate(this.props.angle ? this.props.angle: 0);

        context.drawImage(texture, -arrowWidth / 2, -arrowHeight / 2, arrowWidth, arrowHeight);

        // we're done with the rotating so restore the unrotated context
        context.restore();
      }
    }
  }
  render() {
    this.updateCanvas();
    return false;
  }

}

Arrow.propTypes = {
  texture: PropTypes.object,
  canvas: PropTypes.object,
  angle: PropTypes.number,
};

export default Arrow;
