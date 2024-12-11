import { MultiSelect, Text } from '@nativebricks/core';
import { AxeIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

export default function SelectPage() {
  const [value, setValue] = useState([]);
  return (
    <View className="container">
      <MultiSelect
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
      <MultiSelect
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
      <MultiSelect
        options={['Option 4', 'Option 5', 'Option 6']}
        renderOption={(option) => (
          <Pressable
            className="p-2 bg-primary/25 flex-row items-center gap-2 rounded-xl mb-0.5 hover:bg-primary/15 active:bg-primary/30 transition-all "
            onPress={() => option.setOption()}
          >
            {option.isSelected && <AxeIcon className="text-primary" />}
            <Text className="text-black text-xs">{option.option}</Text>
          </Pressable>
        )}
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
