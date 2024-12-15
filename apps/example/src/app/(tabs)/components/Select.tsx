import { Select, Text } from '@nativebricks/core';
import { AxeIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

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
        containerClassName="border-transparent rounded-none border-b-input bg-transparent"
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
      />
      <Select
        leading={
          <View className="h-full p-2 border-r border-muted bg-background absolute left-0 items-center">
            <Text className="text-sm text-muted-foreground">First Name</Text>
          </View>
        }
        containerClassName=""
        triggerClassName="pl-24"
        options={['Option 4', 'Option 5', 'Option 6']}
        renderOption={(option) => (
          <Pressable
            className="p-2 bg-primary/25 flex-row items-center gap-2 rounded-xl mb-0.5 hover:bg-primary/15 active:bg-primary/30 transition-all "
            onPress={() => option.setOption()}
          >
            {option.isSelected && <AxeIcon className="text-primary" />}
            <Text className="text-foreground text-xs">{option.option.label}</Text>
          </Pressable>
        )}
        placeholder="Select an option"
        value={value}
        onChange={setValue}
      />
    </View>
  );
}
