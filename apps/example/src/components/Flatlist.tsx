import { cn } from '@nativebricks/core';
import React, { useRef, useCallback, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatListProps,
  Platform,
  LayoutChangeEvent,
} from 'react-native';
import { PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native-web';

interface DraggableFlatListProps<T> extends Omit<FlatListProps<T>, 'ref'> {
  style?: ViewStyle;
  snapToInterval?: number;
  snapToAlignment?: 'start' | 'center' | 'end';
  decelerationRate?: number | 'normal' | 'fast';
  onDragStart?: () => void;
  onDragEnd?: () => void;
  disabled?: boolean;
  dragThreshold?: number;
  infiniteLoop?: boolean;
  onCustomScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  wrapperClassname?: string;
  wrapperStyle?: ViewStyle;
}

const DECELERATION_RATE = {
  normal: 0.998,
  fast: 0.99,
};

const isWeb = Platform.OS === 'web';

function DraggableFlatList<T>({
  data,
  renderItem,
  horizontal = true,
  style,
  snapToInterval,
  snapToAlignment = 'center',
  decelerationRate = 'normal',
  onDragStart,
  onDragEnd,
  disabled = false,
  dragThreshold = 2,
  infiniteLoop = false,
  onCustomScroll,
  wrapperClassname,
  wrapperStyle,
  ...props
}: DraggableFlatListProps<T>): React.ReactElement {
  const flatListRef = useRef<FlatList<T>>(null);
  const scrollOffset = useRef({ x: 0, y: 0 });
  const lastDelta = useRef({ x: 0, y: 0 });
  const isScrolling = useRef(false);
  const contentSize = useRef({ width: 0, height: 0 });
  const containerSize = useRef({ width: 0, height: 0 });

  // Create repeated data for infinite loop
  const repeatedData = useCallback(() => {
    if (!infiniteLoop || !data.length) return data;

    return [...(data as any), ...(data as any), ...(data as any)];
  }, [data, infiniteLoop]);

  const getInitialScrollIndex = useCallback(() => {
    if (!infiniteLoop) return 0;
    return data.length; // Start from middle section
  }, [infiniteLoop, data.length]);

  const getDecelerationRate = useCallback(() => {
    if (typeof decelerationRate === 'number') {
      return decelerationRate;
    }
    return DECELERATION_RATE[decelerationRate];
  }, [decelerationRate]);

  const getMaxOffset = useCallback(() => {
    if (horizontal) {
      return Math.max(0, contentSize.current.width - containerSize.current.width);
    }
    return Math.max(0, contentSize.current.height - containerSize.current.height);
  }, [horizontal]);

  const handleInfiniteScroll = useCallback(
    (offset: number) => {
      if (!infiniteLoop || !data.length) return offset;

      const sectionSize = horizontal
        ? contentSize.current.width / 3
        : contentSize.current.height / 3;

      if (offset < sectionSize * 0.1) {
        // Near start - jump to middle section
        const newOffset = offset + sectionSize;
        flatListRef.current?.scrollToOffset({
          offset: newOffset,
          animated: false,
        });
        return newOffset;
      } else if (offset > sectionSize * 1.9) {
        // Near end - jump to middle section
        const newOffset = offset - sectionSize;
        flatListRef.current?.scrollToOffset({
          offset: newOffset,
          animated: false,
        });
        return newOffset;
      }
      return offset;
    },
    [infiniteLoop, data.length, horizontal]
  );

  const getSnapPoint = useCallback(
    (offset: number): number => {
      if (!snapToInterval) return offset;

      const maxOffset = getMaxOffset();
      const clampedOffset = Math.max(0, Math.min(offset, maxOffset));
      const previousSnap = Math.floor(clampedOffset / snapToInterval) * snapToInterval;
      const nextSnap = Math.min(
        maxOffset,
        Math.ceil(clampedOffset / snapToInterval) * snapToInterval
      );

      switch (snapToAlignment) {
        case 'start':
          return previousSnap;
        case 'end':
          return nextSnap;
        default:
          const midPoint = (previousSnap + nextSnap) / 2;
          return clampedOffset < midPoint ? previousSnap : nextSnap;
      }
    },
    [snapToInterval, snapToAlignment, getMaxOffset]
  );

  const animateToOffset = useCallback(
    (targetOffset: number, velocity: number) => {
      if (!flatListRef.current) return;

      const startTime = performance.now();
      const startOffset = horizontal ? scrollOffset.current.x : scrollOffset.current.y;
      const maxOffset = getMaxOffset();
      const clampedTarget = Math.max(0, Math.min(targetOffset, maxOffset));
      const distance = clampedTarget - startOffset;

      if (Math.abs(distance) < 1) return;

      const duration = Math.min(400, Math.abs(distance / velocity) * 1000);

      let lastTimestamp = startTime;
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const deltaTime = currentTime - lastTimestamp;
        lastTimestamp = currentTime;

        if (deltaTime > 100) {
          // Animation was probably paused (tab switch, etc). Abort.
          return;
        }

        const progress = Math.min(1, elapsed / duration);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentOffset = startOffset + distance * easeOut;

        flatListRef.current?.scrollToOffset({
          offset: currentOffset,
          animated: false,
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      if (isWeb) {
        requestAnimationFrame(animate);
      }
    },
    [horizontal, getMaxOffset]
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: (_, gestureState: PanResponderGestureState) => {
        if (disabled) return false;

        const dx = Math.abs(gestureState.dx);
        const dy = Math.abs(gestureState.dy);
        return horizontal ? dx > dragThreshold && dx > dy : dy > dragThreshold && dy > dx;
      },
      onPanResponderGrant: (e: GestureResponderEvent) => {
        if (isWeb) {
          e.preventDefault();
          document.body.classList?.add('no-select');
        }
        lastDelta.current = { x: 0, y: 0 };
        isScrolling.current = true;
        onDragStart?.();
      },
      onPanResponderMove: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (isWeb) {
          e.preventDefault();
        }
        if (!flatListRef.current || !isScrolling.current) return;

        const deltaX = gestureState.dx - lastDelta.current.x;
        const deltaY = gestureState.dy - lastDelta.current.y;

        lastDelta.current = { x: gestureState.dx, y: gestureState.dy };

        const delta = horizontal ? deltaX : deltaY;
        const currentOffset = horizontal ? scrollOffset.current.x : scrollOffset.current.y;
        const maxOffset = getMaxOffset();
        const newOffset = Math.max(0, Math.min(currentOffset - delta, maxOffset));

        flatListRef.current.scrollToOffset({
          offset: newOffset,
          animated: false,
        });
      },
      onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
        isScrolling.current = false;
        if (isWeb) {
          document.body.classList?.remove('no-select');
        }
        onDragEnd?.();

        const velocity = horizontal ? gestureState.vx : gestureState.vy;
        const currentOffset = horizontal ? scrollOffset.current.x : scrollOffset.current.y;

        if (snapToInterval) {
          const projection = currentOffset - velocity * 200;
          const snapPoint = getSnapPoint(projection);
          animateToOffset(snapPoint, Math.abs(velocity));
        } else if (Math.abs(velocity) > 0.05) {
          const decelRate = getDecelerationRate();
          const projection = currentOffset - velocity * 1000 * (1 - decelRate);
          animateToOffset(projection, Math.abs(velocity));
        }
      },
    })
  ).current;

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset } = event.nativeEvent;
      scrollOffset.current = contentOffset;

      // Handle infinite loop scrolling
      if (infiniteLoop) {
        const offset = horizontal ? contentOffset.x : contentOffset.y;
        handleInfiniteScroll(offset);
      }

      // Call custom scroll handler if provided
      onCustomScroll?.(event);
    },
    [horizontal, infiniteLoop, handleInfiniteScroll, onCustomScroll]
  );

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    containerSize.current = { width, height };
  }, []);

  const onContentSizeChange = useCallback((width: number, height: number) => {
    contentSize.current = { width, height };
  }, []);

  // Web-only styles
  useEffect(() => {
    if (!isWeb) return;

    const style = document.createElement('style');
    style.innerHTML = `
      .no-select {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: grab;
      }
      .no-select:active {
        cursor: grabbing;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
      document.body.classList?.remove('no-select');
    };
  }, []);

  return (
    <View
      style={[styles.container, wrapperStyle, style]}
      className={wrapperClassname}
      {...panResponder.panHandlers}
      onLayout={onLayout}
    >
      <FlatList
        ref={flatListRef}
        data={repeatedData()}
        renderItem={renderItem}
        horizontal={horizontal}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onContentSizeChange={onContentSizeChange}
        snapToInterval={snapToInterval}
        snapToAlignment={snapToAlignment}
        decelerationRate={decelerationRate}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        initialScrollIndex={getInitialScrollIndex()}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DraggableFlatList;
