import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Surface, Group } from '@react-native-community/art'
import Wedge from './Wedge';

//const { Surface, Group } = ART;

const AnimatedWedge = Animated.createAnimatedComponent(Wedge);
const circumference = 360;
export default class PieChart extends Component {
  static propTypes = {
    percentArray: PropTypes.arrayOf(PropTypes.any).isRequired,
    colorArray: PropTypes.arrayOf(PropTypes.any).isRequired,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number.isRequired,
    animationType: PropTypes.oneOf(['sequence', 'synchron']),
    rotation: PropTypes.number,
    isClockwise: PropTypes.bool,
    duration: PropTypes.number,
    configArray: PropTypes.arrayOf(PropTypes.any),
    animationEndCallBack: PropTypes.func,
  }

  static defaultProps = {
    innerRadius: 0,
    duration: 800,
    rotation: 0,
    configArray: [],
    animationType: 'sequence',
    isClockwise: true,
    animationEndCallBack: null,
  }

  constructor(props) {
    super(props);

    this.animationArray = [];
    this.endAngleArray = [];
    for (let index = 0; index < this.props.percentArray.length; index++) {
      this.animationArray.push(new Animated.Value(0));
    }

    this.state = {
      wedgeAngles: [],
    };
  }

  componentDidMount() {
    this._handleData();
    this._animations();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props && nextProps) {
      if ((this.props.percentArray.toString() === nextProps.percentArray.toString()) &&
        (this.props.colorArray.toString() === nextProps.colorArray.toString())) {
        return;
      }
    }

    if (nextProps) {
      this.animationArray = [];
      for (let index = 0; index < nextProps.percentArray.length; index++) {
        this.animationArray.push(new Animated.Value(0));
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props && nextProps) {
      if ((this.props.percentArray.toString() === nextProps.percentArray.toString()) &&
        (this.props.colorArray.toString() === nextProps.colorArray.toString())) {
        return;
      }
    }
    if (nextProps && nextState) {
      this.props = nextProps;
      // this.state = nextState;
    }
    this._handleData();
    this._animations();
  }

  _sequenceAnimation = () => {
    const animatedArray = [];
    for (let index = 0; index < this.props.percentArray.length; index++) {
      animatedArray.push(Animated.timing(this.animationArray[index], {
        duration: this.props.duration,
        toValue: circumference,
      }));
    }
    Animated.sequence(animatedArray).start(this.props.animationEndCallBack);
  }
  _syncAnimation = () => {
    const animatedArray = [];
    for (let index = 0; index < this.props.percentArray.length; index++) {
      animatedArray.push(Animated.timing(this.animationArray[index], {
        duration: this.props.duration,
        toValue: circumference,
      }));
    }
    Animated.parallel(animatedArray).start(this.props.animationEndCallBack);
  }

  _animations = () => {
    this.props.animationType === 'sequence' ? this._sequenceAnimation() : this._syncAnimation();
  }

  _handleData = () => {
    const wedgeAngles = [];
    const endAngleArray = [];

    for (let index = 0; index < this.props.percentArray.length; index++) {
      let sum = 0;
      for (let index2 = 0; index2 <= index; index2++) {
        sum += this.props.percentArray[index2];
      }
      this.props.isClockwise ? endAngleArray.push(sum) : endAngleArray.push(1 - sum);
    }
    this.endAngleArray = endAngleArray;

    for (let index = 0; index < this.props.percentArray.length; index++) {

      const startAngle = index === 0 ? 0 : this.endAngleArray[index - 1] * circumference;

      const endAngle = this.props.isClockwise ?
        startAngle + (this.props.percentArray[index] * circumference) :
        startAngle - (this.props.percentArray[index] * circumference);

      wedgeAngles.push(this.animationArray[index].interpolate({
        inputRange: [0, circumference],
        outputRange: [startAngle, endAngle],
        extrapolate: 'clamp',
      }));
    }
    this.setState({
      wedgeAngles,
    });
  }

  render() {
    return (
      <Surface rotation={-90} width={this.props.outerRadius * 2} height={this.props.outerRadius * 2}>
        <Group rotation={this.props.rotation} originX={this.props.outerRadius} originY={this.props.outerRadius}>
          {this.state.wedgeAngles.map((data, index) => {
            let rstroke;
            let rstrokeWidth;
            let rstrokeDash;
            if (this.props.configArray.length > 0 && this.props.configArray[index]) {
              rstroke = this.props.configArray[index].stroke;
              rstrokeWidth = this.props.configArray[index].strokeWidth;
              rstrokeDash = this.props.configArray[index].strokeDash;
            }
            const startAngle = index === 0 ? index : this.endAngleArray[index - 1] * circumference;
            const endAngle = this.state.wedgeAngles[index];
            const key = index;
            return (
              <AnimatedWedge
                key={key}
                outerRadius={this.props.outerRadius}
                innerRadius={this.props.innerRadius}
                startAngle={this.props.isClockwise ? startAngle : endAngle}
                stroke={rstroke}
                strokeWidth={rstrokeWidth}
                strokeDash={rstrokeDash}
                endAngle={this.props.isClockwise ? endAngle : startAngle}
                fill={this.props.colorArray[index]}
              />
            );
          })}
        </Group>
      </Surface>
    );
  }
}

PieChart.Wedge = Wedge;
