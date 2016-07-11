/**
 * Created by Hoang Vu Bui.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';

class SelectionRectangle extends React.Component {
  constructor(props) {
    super(props);
  }
  updateCanvas() {
    var canvas = this.props.canvas;
    if (canvas) {
      let context = canvas.getContext('2d');
      context.setLineDash([2, 3]);
	    context.strokeRect(
        this.props.dragStartX,
        this.props.dragStartY,
        this.props.dragCurrentX - this.props.dragStartX,
        this.props.dragCurrentY - this.props.dragStartY);
    }
  }
  render() {
    if (
      this.props.dragStartX !== null &&
      this.props.dragStartY !== null &&
      this.props.dragCurrentX !== null &&
      this.props.dragCurrentY !== null
    ) {
      this.updateCanvas();
    }
    return false;
  }
}

SelectionRectangle.propTypes = {
  canvas: PropTypes.object,
  dragStartX: PropTypes.number,
  dragStartY: PropTypes.number,
  dragCurrentX: PropTypes.number,
  dragCurrentY: PropTypes.number,
};

export default SelectionRectangle;
