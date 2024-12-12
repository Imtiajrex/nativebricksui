import React from 'react';
import { StyleProp, TextStyle, Text, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import styles from './style';

interface ItemProps {
  textStyle: StyleProp<TextStyle>;
  style: StyleProp<ViewStyle>;
  option: string | null;
  height: number;
  index: number;
  scrollY: Animated.SharedValue<number>;
  visibleRest: number;
  rotationFunction: (x: number) => number;
  opacityFunction: (x: number) => number;
  scaleFunction: (x: number) => number;
}

const WheelPickerItem: React.FC<ItemProps> = ({
  textStyle,
  style,
  height,
  option,
  index,
  scrollY,
  visibleRest,
  opacityFunction,
  rotationFunction,
  scaleFunction,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const relativeScrollIndex =
      index -
      interpolate(scrollY.value, [0, height], [visibleRest, visibleRest + 1], Extrapolation.CLAMP);

    const opacity = interpolate(
      Math.abs(relativeScrollIndex),
      [0, visibleRest + 1],
      [1, opacityFunction(Math.abs(relativeScrollIndex))],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      Math.abs(relativeScrollIndex),
      [0, visibleRest + 1],
      [1, scaleFunction(Math.abs(relativeScrollIndex))],
      Extrapolation.CLAMP
    );

    return {
      height,
      opacity,
      transform: [{ scale }],
    };
  }, [scrollY, index, height, visibleRest]);

  return (
    <Animated.View style={[styles.option, style, animatedStyle]}>
      <Text style={textStyle}>{option}</Text>
    </Animated.View>
  );
};

export default React.memo(WheelPickerItem);
