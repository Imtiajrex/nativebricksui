import React, { useState, useRef, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_HEIGHT = 40; // Adjust based on your design
const VISIBLE_ITEMS = 5; // Number of visible items at once

const WheelPicker = ({ data, onValueChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatListRef = useRef(null);

  // Center offset
  const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2);
  const OFFSET = ((VISIBLE_ITEMS - 1) / 2) * ITEM_HEIGHT;

  useEffect(() => {
    scrollToIndex(selectedIndex, false);
  }, [selectedIndex]);

  const scrollToIndex = (index, animated = true) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: index * ITEM_HEIGHT,
        animated,
      });
    }
  };

  const handleScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (index !== selectedIndex) {
      setSelectedIndex(index);
      onValueChange(data[index]);
    }
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.itemContainer,
        {
          height: ITEM_HEIGHT,
        },
      ]}
    >
      <Text style={[styles.itemText, index === selectedIndex && styles.selectedText]}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingVertical: OFFSET,
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {/* Center Overlay */}
      <View style={styles.overlay} pointerEvents="none" />
    </View>
  );
};

export default function App() {
  const data = Array.from({ length: 50 }, (_, i) => `${i + 1}`);
  return (
    <View style={styles.appContainer}>
      <WheelPicker data={data} onValueChange={(value) => console.log('Selected Value:', value)} />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.8,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: '#888',
  },
  selectedText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: ITEM_HEIGHT * (VISIBLE_ITEMS / 2) - ITEM_HEIGHT / 2,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
