import { Button, Icon, Input, Text, useColorScheme } from '@nativebricks/core';
import { router, Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
export default function index() {
  const [search, setSearch] = useState('');
  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(search.toLowerCase())
  );
  const dialogRef = useRef(null);
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="px-4 max-w-4xl w-full mx-auto py-8 gap-2 bg-background"
    >
      <Stack.Screen options={{ headerTitle: 'Native Bricks Components' }} />
      <Button onPress={() => {}}>Open Dialog</Button>
      <Button
        onPress={() => {
          setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
        }}
        variant="light"
      >
        Chnage Theme
      </Button>

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

export const components = [
  {
    name: 'Input',
    description: 'A text input field.',
  },
  {
    name: 'Button',
    description: 'Button components.',
  },
  {
    name: 'Popover',
    description: 'Popover component.',
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
    name: 'Slider',
    description: 'Slider component',
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
      <View className="w-full p-3 border-b border-border flex-row items-center justify-between bg-background-emphasis rounded-radius">
        <Text>{label}</Text>
        <Icon name="arrow-right-line" className="fill-content-subtle" />
      </View>
    </Pressable>
  );
};
