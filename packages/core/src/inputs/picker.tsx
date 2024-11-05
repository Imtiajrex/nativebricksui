import { memo, useCallback } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Platform, Text, View } from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { FlatList, FlatListProps } from '../layout';
type DataType = {
  label: string;
  value: string | number;
};
export type PickerProps = Omit<FlatListProps<DataType>, 'renderItem'> & {
  value?: string;
  onChange?: (value: string) => void;
};
const ITEM_HEIGHT = 40;
const isWeb = Platform.OS === 'web';
const contentContainerStyle = {
  paddingTop: ITEM_HEIGHT * 2,
  paddingBottom: ITEM_HEIGHT * 2,
};
const style = {
  height: '100%',
} as const;
export function Picker(props: PickerProps) {
  console.log('render picker');
  const scrollY = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        scrollY.value = event.contentOffset.y;
      },
      onMomentumEnd: (event) => {
        const index = Math.round(event.contentOffset.y / ITEM_HEIGHT);
        const value = props.data[index].value;
        props.onChange && runOnJS(props.onChange)(value);
      },
    },
    [props.data, props.onChange]
  );
  const onScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
      const value = props.data[index].value;
      props.onChange?.(value);
    },
    [props.data, props.onChange, scrollY]
  );

  const onWebScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollY.value = event.nativeEvent.contentOffset.y;
      props.onChange?.(props.data[Math.round(scrollY.value / ITEM_HEIGHT)].value);
    },
    [scrollY]
  );
  const renderItem = useCallback(
    ({ item, index }: { item: DataType; index: number }) => {
      return <Item index={index} label={item.label} scrollY={scrollY} />;
    },
    [scrollY]
  );

  return (
    <>
      <View
        className={'w-max flex-1 overflow-hidden bg-card '}
        style={{
          height: ITEM_HEIGHT * 5,
        }}
      >
        <View
          className="absolute top-0 left-0 rounded-radius overflow-hidden z-50 w-full"
          style={{
            transform: [{ translateY: ITEM_HEIGHT * 2.5 - 20 }], // center the highlight
            height: ITEM_HEIGHT,
          }}
          pointerEvents="none"
        >
          <View className="w-full h-full bg-black/5 rounded-radius" />
        </View>
        <FlatList
          data={props.data}
          renderItem={renderItem}
          snapToInterval={ITEM_HEIGHT}
          initialNumToRender={5}
          style={style}
          contentContainerStyle={contentContainerStyle}
          className="bg-white rounded-xl"
          contentContainerClassName="items-center"
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          {...{
            [isWeb ? 'onCustomScroll' : 'onScroll']: isWeb ? onWebScroll : onScrollEnd,
          }}
        />
      </View>
    </>
  );
}

const Item = memo(
  ({ label, scrollY, index }: { label: string; scrollY: SharedValue<number>; index: number }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const inputRange = [
        (index - 2) * ITEM_HEIGHT,
        (index - 1) * ITEM_HEIGHT,
        index * ITEM_HEIGHT,
        (index + 1) * ITEM_HEIGHT,
        (index + 2) * ITEM_HEIGHT,
      ];
      const opacity = interpolate(scrollY.value, inputRange, [0.2, 0.5, 1, 0.5, 0.2]);
      const scale = interpolate(scrollY.value, inputRange, [0.8, 0.9, 1, 0.9, 0.8]);
      return {
        opacity: opacity,
        transform: [{ scale }],
      };
    });
    return (
      <View
        style={{
          width: '100%',
          height: ITEM_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={[
            {
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            },
            animatedStyle,
          ]}
          className={'px-3'}
        >
          <Text className="text-center">{label}</Text>
        </Animated.View>
      </View>
    );
  }
);
