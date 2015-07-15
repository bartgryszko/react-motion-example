import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Circles } from '.';
import * as circleActions from '../actions/CircleActions';

@connect(state => ({
  circles: state.circle.get('circles'),
}))
export class CirclesHandler extends Component {
  static propTypes = {
    circles: PropTypes.object,
    dispatch: PropTypes.func,
  }

  render() {
    const { dispatch, ...other} = this.props;

    return (
      <div>
        <Circles {...other} {...bindActionCreators(circleActions, dispatch)} />
      </div>
    );
  }
}
