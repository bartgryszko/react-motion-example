import React, { Component, PropTypes } from 'react';
import { TransitionSpring } from 'react-motion';


export class Circles extends Component {
  static propTypes = {
    circles: PropTypes.object,
    addCircle: PropTypes.func,
  }

  state = {
    mouse: [300, 300],
  }

  handleMouseMove({pageX, pageY}) {
    this.setState({mouse: [pageX, pageY]});
  }

  handleTouchMove({touches}) {
    this.handleMouseMove(touches[0]);
  }

  handleClick() {
    const { addCircle } = this.props;
    addCircle();
  }

  getValues(currentPositions) {
    const { circles } = this.props;
    let newPositions;

    if (currentPositions == null) {
      newPositions = circles.map(() => ({ val: [0, 0] }));
    } else {
      newPositions = circles.map((circle, rawKey) => {
        const key = parseInt(rawKey, 10);

        return key === 0
          ? { val: this.state.mouse, config: [120, 17] }
          : { val: currentPositions[key - 1].val, config: [120, 17] };
      });
    }

    return newPositions.toObject();
  }

  renderCircle(currentPositions) {
    if (!currentPositions) {
      return null;
    }

    const currentPositionsKeys = Object.keys(currentPositions);
    return currentPositionsKeys.map(key => {
      const [x, y] = currentPositions[key].val;
      return (
        <div
          key={key}
          style={{
            ...styles.circle,
            backgroundColor: `hsl(${key * 3}, 100%, 60%)`,
            WebkitTransform: `translate3d(${x - 25}px, ${y - 25}px, 0)`,
            transform: `translate3d(${x - 25}px, ${y - 25}px, 0)`,
            zIndex: currentPositionsKeys.length - key,
          }}>
          {key}
        </div>
      );
    });
  }

  render() {
    const { circles } = this.props;

    return (
      <TransitionSpring endValue={::this.getValues}>
        {currentPositions =>
          <div
            style={styles.scene}
            onClick={::this.handleClick}
            onMouseMove={::this.handleMouseMove}
            onTouchMove={::this.handleTouchMove}>
              {this.renderCircle(currentPositions)}
              <div style={styles.counter}>
                { circles.size }
              </div>
          </div>
        }
      </TransitionSpring>
    );
  }
}

const styles = {
  scene: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    background: 'rgb(230, 230, 230)',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  },

  counter: {
    fontSize: 120,
    color: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    WebkitTransform: `translate3d(-50%, -50%, 0)`,
    transform: `translate3d(-50%, -50%, 0)`,
    left: '50%',
    top: '50%',
  },

  circle: {
    borderRadius: 99,
    width: 50,
    height: 50,
    position: 'absolute',
    backgroundSize: 50,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: 3,
  },
};
