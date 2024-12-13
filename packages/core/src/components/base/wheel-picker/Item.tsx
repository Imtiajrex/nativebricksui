import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Text } from '../text';
import styles from './style';

interface ItemProps {
  textStyle: StyleProp<TextStyle>;
  style: StyleProp<ViewStyle>;
  option: string | null;
  height: number;
  index: number;
  currentScrollIndex: SharedValue<number>;
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
  visibleRest,
  currentScrollIndex,
  opacityFunction,
  rotationFunction,
  scaleFunction,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const relativeScrollIndex = currentScrollIndex.value - index + 2;
    const inputRange = (() => {
      const range = [0];
      for (let i = 1; i <= visibleRest + 1; i++) {
        range.unshift(-i);
        range.push(i);
      }
      return range;
    })();
    const opacity = interpolate(
      relativeScrollIndex,
      inputRange,
      (() => {
        const range = [1.0];
        for (let x = 1; x <= visibleRest + 1; x++) {
          range.unshift(opacityFunction(x));
          range.push(opacityFunction(x));
        }
        return range;
      })()
    );
    const scale = interpolate(
      relativeScrollIndex,
      inputRange,
      (() => {
        const range = [1.0];
        for (let x = 1; x <= visibleRest + 1; x++) {
          const y = scaleFunction(x);
          range.unshift(y);
          range.push(y);
        }
        return range;
      })()
    );
    const rotation = interpolate(
      relativeScrollIndex,
      inputRange,
      (() => {
        const range = [0];
        for (let x = 1; x <= visibleRest + 1; x++) {
          range.unshift(rotationFunction(x));
          range.push(rotationFunction(x));
        }
        return range;
      })()
    );
    return {
      transform: [
        { scale },
        {
          rotate: `${rotation}deg`,
        },
      ],
      opacity,
    };
  }, [height, scaleFunction, opacityFunction, visibleRest]);

  return (
    <Animated.View style={[styles.option, style, { height }, animatedStyle]}>
      <Text className="text-foreground" style={textStyle}>
        {option}
      </Text>
    </Animated.View>
  );
};

export default React.memo(
  WheelPickerItem,
  /**
   * We enforce that this component will not rerender after the initial render.
   * Therefore props that change on every render like style objects or functions
   * do not need to be wrapped into useMemo and useCallback.
   */
  () => true
);
