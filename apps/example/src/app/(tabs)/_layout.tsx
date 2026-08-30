import { View, Text, Linking } from 'react-native';
import React from 'react';
import { Stack, usePathname } from 'expo-router';
import { Button } from '@nativebricks/core';

export default function _layout() {
  const pathname = usePathname();
  return (
    <Stack
      screenOptions={{
        headerTitle: (props) => (
          <Text className="text-lg font-medium">{props.children.replace('components/', '')}</Text>
        ),
        headerRight: (props) =>
          pathname != '/' && (
            <Button
              size="sm"
              onPress={() => {
                Linking.openURL(
                  `https://github.com/Imtiajrex/nativebricksui/tree/master/apps/example/src/app/(tabs)/${pathname}.tsx`
                );
              }}
              className="mr-4"
            >
              <Text className="text-sm font-medium">Open Source</Text>
            </Button>
          ),
      }}
    />
  );
}
