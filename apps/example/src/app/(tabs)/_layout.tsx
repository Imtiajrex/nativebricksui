import { View, Text, Linking } from 'react-native';
import React from 'react';
import { Stack, usePathname } from 'expo-router';

export default function _layout() {
  const pathname = usePathname();
  return (
    <View className="flex-1 bg-background">
      <Stack
        screenOptions={{
          headerTitle: (props) => (
            <Text className="text-lg font-medium text-content">
              {props.children.replace('components/', '')}
            </Text>
          ),
          headerRight: (props) => pathname != '/' && <></>,
        }}
      />
    </View>
  );
}
