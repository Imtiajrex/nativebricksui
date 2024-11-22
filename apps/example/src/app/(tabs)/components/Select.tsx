import { Select } from '@nativebricks/core';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function SelectPage() {
  const [value, setValue] = useState('');
  return (
    <View className="container">
      <Select
        options={[
          {
            group: 'Group 1',
            items: ['Option 1', 'Option 2', 'Option 3'],
          },
          'Option 4',
          'Option 5',
          'Option 6',
        ]}
        placeholder="Select an option"
        value={value}
        onChange={setValue}
        label="Select an option"
        helperText="Select an option from the list"
        asterisk
      />
      <Select
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
        placeholder="Select an option"
        value={value}
        onChange={setValue}
        label="Select an option"
        helperText="Select an option from the list"
        message="Invalid Option!"
        error
      />
      <Select
        options={['Option 4', 'Option 5', 'Option 6']}
        placeholder="Select an option"
        value={value}
        onChange={setValue}
        label="Select an option"
        message="Option looks good!"
        success
      />
    </View>
  );
}
