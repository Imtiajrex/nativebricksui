import { Tabs } from '@nativebricks/core';
import React from 'react';
import { Text, View } from 'react-native';

export default function TabsScreen() {
  const [value, setValue] = useState('account');
  return (
    <View className="p-4">
      <Tabs
        tabs={[
          {
            label: 'Account',
            value: 'account',
            content: <Text>Account content</Text>,
          },
          {
            label: 'Password',
            value: 'password',
            content: <Text>Password content</Text>,
          },
        ]}
        contentClassName="p-4 bg-card rounded-lg shadow shadow-foreground/10"
        value={value}
        onValueChange={setValue}
      />
    </View>
  );
}
