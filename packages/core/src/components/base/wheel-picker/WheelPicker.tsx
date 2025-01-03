import { AnimatedFlashList, FlashListProps, FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { runOnJS, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import WheelPickerItem from './Item';
import styles from './style';

export type WheelPickerProps = {
  selectedIndex: number;
  options: string[];
  onChange: (value: string, index: number) => void;
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
  decelerationRate?: 'normal' | 'fast' | number;
  flatListProps?: Partial<Omit<FlashListProps<string | null>, 'data' | 'renderItem'>>;
  containerClassName?: string;
  showScrollIndicator?: boolean;
};

const WheelPicker: React.FC<WheelPickerProps> = ({
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
  decelerationRate = 'fast',
  containerProps = {},
  flatListProps = {},
  containerClassName,
  showScrollIndicator = true,
}) => {
  const flatListRef = useRef<FlashList<any>>(null);
  const scrollY = useSharedValue(0);

  const containerHeight = (1 + visibleRest * 2) * itemHeight;
  const paddedOptions = useMemo(() => {
    const array: (string | null)[] = [...options];
    for (let i = 0; i < visibleRest; i++) {
      array.unshift(null);
      array.push(null);
    }
    return array;
  }, [options, visibleRest]);

  const offsets = useMemo(
    () => [...Array(paddedOptions.length)].map((x, i) => i * itemHeight),
    [paddedOptions, itemHeight]
  );

  const currentScrollIndex = useDerivedValue(() => {
    const index = Math.round(scrollY.value / itemHeight);
    runOnJS(onChange)(options[index], index);
    return index;
  }, [visibleRest, scrollY, itemHeight]);
  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      // Due to list bounciness when scrolling to the start or the end of the list
      // the offset might be negative or over the last item.
      // We therefore clamp the offset to the supported range.
      const offsetY = Math.min(
        itemHeight * (options.length - 1),
        Math.max(event.nativeEvent.contentOffset.y, 0)
      );

      let index = Math.floor(Math.floor(offsetY) / itemHeight);
      const last = Math.floor(offsetY % itemHeight);
      if (last > itemHeight / 2) index++;

      if (index !== selectedIndex) {
        onChange(options[index], index);
      }
    },
    [itemHeight, onChange, options, selectedIndex]
  );

  useEffect(() => {
    if (selectedIndex < 0 || selectedIndex >= options.length) {
      console.error(`Selected index ${selectedIndex} is out of bounds [0, ${options.length - 1}]`);
    }
  }, [selectedIndex, options]);

  /**
   * If selectedIndex is changed from outside (not via onChange) we need to scroll to the specified index.
   * This ensures that what the user sees as selected in the picker always corresponds to the value state.
   */

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      if (flatListRef.current)
        flatListRef.current?.scrollToIndex({
          index: selectedIndex,
          animated: false,
        });
      mounted.current = true;
    }
  }, [selectedIndex]);
  const renderFlashList = useMemo(() => {
    return (
      <AnimatedFlashList
        {...flatListProps}
        ref={flatListRef}
        showsVerticalScrollIndicator={showScrollIndicator}
        onScroll={(e) => {
          scrollY.value = e.nativeEvent.contentOffset.y;
        }}
        snapToInterval={itemHeight}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        estimatedItemSize={itemHeight}
        decelerationRate={decelerationRate}
        initialScrollIndex={selectedIndex}
        data={paddedOptions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: option, index }) => (
          <WheelPickerItem
            key={`option-${index}`}
            index={index}
            option={option}
            style={itemStyle}
            textStyle={itemTextStyle}
            height={itemHeight}
            currentScrollIndex={currentScrollIndex}
            scaleFunction={scaleFunction}
            rotationFunction={rotationFunction}
            opacityFunction={opacityFunction}
            visibleRest={visibleRest}
          />
        )}
      />
    );
  }, [
    currentScrollIndex,
    decelerationRate,
    flatListProps,
    handleMomentumScrollEnd,
    itemHeight,
    itemStyle,
    itemTextStyle,
    opacityFunction,
    paddedOptions,
    rotationFunction,
    scaleFunction,
    selectedIndex,
    visibleRest,
    offsets,
  ]);
  const renderIndicator = useMemo(() => {
    return (
      <View
        className="bg-card"
        style={[
          styles.selectedIndicator,
          selectedIndicatorStyle,
          {
            transform: [{ translateY: -itemHeight / 2 }],
            height: itemHeight,
          },
        ]}
      />
    );
  }, [itemHeight, selectedIndicatorStyle]);

  return (
    <View
      className={containerClassName}
      style={[{ height: containerHeight }, containerStyle]}
      {...containerProps}
    >
      {renderIndicator}
      {renderFlashList}
    </View>
  );
};

export default WheelPicker;
