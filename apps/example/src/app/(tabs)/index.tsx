import { Button, Dialog, Input, Select, Text, useColor } from '@nativebricks/core';
import { router, Stack } from 'expo-router';
import { ChevronRightIcon } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
export default function index() {
  const [search, setSearch] = React.useState('');
  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(search.toLowerCase())
  );
  const dialogRef = React.useRef(null);
  const [value, setValue] = React.useState('');
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="px-4 max-w-4xl w-full mx-auto py-8 gap-2 bg-primary/10"
    >
      <Stack.Screen options={{ headerTitle: 'Native Bricks Components' }} />
      <Button onPress={() => dialogRef.current?.show()}>
        <Text className="">Open Dialog</Text>
      </Button>
      <Dialog ref={dialogRef}>
        <Text className="text-black">Dialog</Text>
        <Select
          options={['Option 1', 'Option 2', 'Option 3']}
          placeholder="Select an option"
          value={value}
          onChange={setValue}
          label="Select an option"
          helperText="Select an option from the list"
          asterisk
        />
      </Dialog>
      <Input placeholder="Search for a component" value={search} onChangeText={setSearch} />
      {filteredComponents.map((component) => (
        <NavLink key={component.name} label={component.name} />
      ))}
      {filteredComponents.length === 0 && (
        <View className="p-3 border-b border-muted bg-card rounded-radius">
          <Text>No components found.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const components = [
  {
    name: 'Input',
    description: 'A text input field.',
  },
  {
    name: 'Select',
    description: 'A select input field.',
  },
  {
    name: 'MultiSelect',
    description: 'A multi select input field.',
  },
  {
    name: 'Form',
    description: 'Form components.',
  },
  {
    name: 'Dialog',
    description: 'Dialog component',
  },
  {
    name: 'Action-Sheet',
    description: 'Action Sheet component',
  },
  {
    name: 'Bottom-Sheet',
    description: 'Bottom Sheet component',
  },
  {
    name: 'Alert-Dialog',
    description: 'Alert Dialog component',
  },
  {
    name: 'Accordion',
    description: 'Accordion component',
  },
  {
    name: 'Avatar',
    description: 'Avatar component',
  },
  {
    name: 'Progress',
    description: 'Progress component',
  },
  {
    name: 'Radio',
    description: 'Radio component',
  },
  {
    name: 'Checkbox',
    description: 'Checkbox component',
  },
  {
    name: 'Switch',
    description: 'Switch component',
  },
  {
    name: 'Skeleton',
    description: 'Skeleton component',
  },
  {
    name: 'Table',
    description: 'Table component',
  },
  {
    name: 'Data-Table',
    description: 'Data Table component',
  },
  {
    name: 'Toggle',
    description: 'Toggle component',
  },
  {
    name: 'Toggle-Group',
    description: 'Toggle Group component',
  },
  {
    name: 'Chip',
    description: 'Chip component',
  },
  {
    name: 'Tab',
    description: 'Tabs component',
  },
  {
    name: 'Calendar',
    description: 'Calendar component',
  },
  {
    name: 'WheelPicker',
    description: 'Wheel picker component',
  },
];
const NavLink = ({ label = '' }) => {
  return (
    <Pressable
      onPress={() => {
        router.push(`/components/${label}`);
      }}
    >
      <View className="w-full p-3 border-b border-muted flex-row items-center justify-between bg-card rounded-radius">
        <Text>{label}</Text>
        <ChevronRightIcon className="w-5 h-5" color={useColor('foreground')} size={24} />
      </View>
    </Pressable>
  );
};
