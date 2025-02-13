import { View, Text } from 'react-native';
import React from 'react';
import { Select } from '@nativebricks/core';

export default function SelectPage() {
  const [value, setValue] = React.useState('');
  return (
    <View className="container">
      <Select
        options={[
          {
            label: 'Option 1',
            value: 'option1',
          },
          {
            label: 'Option 2',
            value: 'option2',
          },
        ]}
        value={value}
        onChange={setValue}
        placeholder="Select an option"
      />
    </View>
  );
}
