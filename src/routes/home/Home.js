/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Soundboard from '../../components/Soundboard';

const title = 'VR Headphones';

class Home extends React.Component {
  componentDidMount() {
    const key = require('keymaster');
    key('ctrl + z', () => { this.props.dispatch(ActionCreators.undo()); });
    key('ctrl + shift + z', () => { this.props.dispatch(ActionCreators.redo()); });
  }

  render() {
    this.context.setTitle(title);
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.title} />
          <Soundboard
            angle={this.props.angle}
            soundSources={this.props.soundSources}
          />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  angle: PropTypes.number.isRequired,
  soundSources: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};
Home.contextTypes = { setTitle: PropTypes.func.isRequired };

const mapStateToProps = (state) => ({
  angle: state.soundboardReducer.directionalTurn.present.angle,
  soundSources: state.soundboardReducer.directionalTurn.present.soundSources,
});

const HomeApp = connect(
  mapStateToProps,
)(Home);

export default withStyles(s)(HomeApp);
