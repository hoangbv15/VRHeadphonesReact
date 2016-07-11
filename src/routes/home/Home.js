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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Soundboard from '../../components/Soundboard';

const title = 'VR Headphones';

function Home({ angle, soundSources }, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1 className={s.title} />
        <Soundboard angle={angle} soundSources={soundSources} />
      </div>
    </div>
  );
}

Home.propTypes = {
  angle: PropTypes.number.isRequired,
  soundSources: PropTypes.array.isRequired,
};
Home.contextTypes = { setTitle: PropTypes.func.isRequired };

const mapStateToProps = (state) => ({
  angle: state.soundboardReducer.directionalTurn.angle,
  soundSources: state.soundboardReducer.directionalTurn.soundSources,
});

const HomeApp = connect(
  mapStateToProps,
)(Home);

export default withStyles(s)(HomeApp);
