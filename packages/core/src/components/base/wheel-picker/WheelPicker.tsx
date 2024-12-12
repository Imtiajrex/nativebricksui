// WheelPicker.tsx
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  View,
  ViewProps,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import styles from './style';
import WheelPickerItem from './Item';

interface Props {
  selectedIndex: number;
  options: string[];
  onChange: (index: number) => void;
  selectedIndicatorStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: TextStyle;
  itemStyle?: ViewStyle;
  itemHeight?: number;
  containerStyle?: ViewStyle;
  containerProps?: Omit<ViewProps, 'style'>;
  scaleFunction?: (x: number) => number;
  rotationFunction?: (x: number) => number;
  opacityFunction?: (x: number) => number;
  visibleRest?: number;
  decelerationRate?: number;
}

const WheelPicker: React.FC<Props> = ({
  selectedIndex,
  options,
  onChange,
  selectedIndicatorStyle = {},
  containerStyle = {},
  itemStyle = {},
  itemTextStyle = {},
  itemHeight = 40,
  scaleFunction = (x: number) => 1.0 ** x,
  rotationFunction = (x: number) => 1 - Math.pow(1 / 2, x),
  opacityFunction = (x: number) => Math.pow(1 / 3, x),
  visibleRest = 2,
  decelerationRate = 0.9,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollOffset, setScrollOffset] = useState(selectedIndex * itemHeight);
  const scrollY = useSharedValue(scrollOffset);

  const containerHeight = (1 + visibleRest * 2) * itemHeight;
  const paddedOptions = useMemo(() => {
    const array: (string | null)[] = [...options];
    for (let i = 0; i < visibleRest; i++) {
      array.unshift(null);
      array.push(null);
    }
    return array;
  }, [options, visibleRest]);

  const calculateNearestIndex = (offset: number): number => {
    let index = Math.round(offset / itemHeight);
    return Math.max(0, Math.min(index, options.length - 1));
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    const newOffset = contentOffset.y;

    scrollY.value = newOffset;
    setScrollOffset(newOffset);

    const nearestIndex = calculateNearestIndex(newOffset);
    if (nearestIndex !== selectedIndex) {
      onChange(nearestIndex);
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const newOffset = scrollOffset - event.translationY;

      scrollViewRef.current?.scrollTo({
        y: newOffset,
        animated: false,
      });

      scrollY.value = newOffset;
      setScrollOffset(newOffset);
    })
    .onEnd((event) => {
      const newOffset = scrollOffset - event.translationY;
      const nearestIndex = calculateNearestIndex(newOffset);

      scrollViewRef.current?.scrollTo({
        y: nearestIndex * itemHeight,
        animated: true,
      });

      if (nearestIndex !== selectedIndex) {
        onChange(nearestIndex);
      }
    });

  // Scroll to selected index effect
  React.useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < options.length) {
      const targetOffset = selectedIndex * itemHeight;

      scrollViewRef.current?.scrollTo({
        y: targetOffset,
        animated: false,
      });

      scrollY.value = targetOffset;
      setScrollOffset(targetOffset);
    }
  }, [selectedIndex, options.length]);

  const selectedIndicatorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -itemHeight / 2 }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={[styles.container, { height: containerHeight }, containerStyle]}>
        <Animated.View
          style={[
            styles.selectedIndicator,
            selectedIndicatorStyle,
            selectedIndicatorAnimatedStyle,
            { height: itemHeight },
          ]}
        />
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          decelerationRate={decelerationRate}
          contentContainerStyle={{
            paddingTop: visibleRest * itemHeight,
            paddingBottom: visibleRest * itemHeight,
          }}
        >
          {paddedOptions.map((option, index) => (
            <WheelPickerItem
              key={`option-${index}`}
              index={index}
              option={option}
              style={itemStyle}
              textStyle={itemTextStyle}
              height={itemHeight}
              scrollY={scrollY}
              visibleRest={visibleRest}
              scaleFunction={scaleFunction}
              rotationFunction={rotationFunction}
              opacityFunction={opacityFunction}
            />
          ))}
        </ScrollView>
      </View>
    </GestureDetector>
  );
};

export default WheelPicker;

// Item.tsx remains the same as in the previous implementation
