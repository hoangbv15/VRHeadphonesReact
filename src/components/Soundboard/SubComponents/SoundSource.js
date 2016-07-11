/**
 * Created by Hoang Vu Bui.
 */

import React, { PropTypes } from 'react';
import { FONT_SIZE, FONT_FACE, FILENAME_LENGTH } from '../../../constants'
import cx from 'classnames';
import _ from 'lodash';

class SoundSource extends React.Component {
  constructor(props) {
    super(props);
  }
  updateCanvas() {
    var canvas = this.props.canvas;
    var texture = this.props.texture;
    if (canvas) {
      let context = canvas.getContext('2d');
      if (texture) {
        // Draw a circle representing a sound source
        let x = ((1 - this.props.x) * canvas.width / 2) - texture.width / 2;
		    let y = ((1 - this.props.y) * canvas.height / 2) - texture.height / 2;
        context.drawImage(texture, x, y);

        // Draw the numbering of the sound source
    		context.font = FONT_SIZE + "px " + FONT_FACE;
    		context.fillText("" + (this.props.number + 1), x - FONT_SIZE / 4 + texture.width / 2, y + FONT_SIZE / 3 + texture.height / 2);

        // Draw the text on top of the sound source
        context.fillText(
          _.truncate(this.props.text, {
            length: FILENAME_LENGTH,
            omission: '...'
          }),
          x - FONT_SIZE, y);

        // Draw dashed lines around the selected sound source
        if (this.props.selected) {
          context.setLineDash([2, 3]);
          context.strokeRect(x, y, texture.width, texture.height);
		    }
      }
    }
  }
  render() {
    this.updateCanvas();
    return false;
  }
}

SoundSource.propTypes = {
  texture: PropTypes.object,
  canvas: PropTypes.object,
  text: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  number: PropTypes.number,
  selected: PropTypes.bool,
};

export default SoundSource;
