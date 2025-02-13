import { View, Text } from 'react-native';
import React from 'react';
import { Input } from '@nativebricks/core';
import { Icon } from '@nativebricks/core/lib/Icon';

export default function InputPage() {
  const [value, setValue] = React.useState('');
  return (
    <View className="flex-1 pt-12 container bg-background">
      <Input value={value} onChangeText={setValue} placeholder="Enter your name" />
      <Input
        value={value}
        onChangeText={setValue}
        placeholder="Enter your password"
        type="password"
      />
      <Input
        value={value}
        onChangeText={setValue}
        placeholder="Search"
        type="search"
        inputClassName="rounded-full"
      />
      <Input
        value={value}
        onChangeText={setValue}
        placeholder="Search"
        inputClassName="pl-14"
        leading={
          <View className="text-sm rounded-l-md font-bold p-2 bg-muted items-center justify-center border-r border-border  text-content-subtle ml-0.5">
            USD
          </View>
        }
      />
    </View>
  );
}
