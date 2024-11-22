import { Input } from '@nativebricks/core';
import { Link, Stack } from 'expo-router';
import { ChevronRightIcon } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function index() {
  const [search, setSearch] = React.useState('');
  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="px-4 max-w-4xl w-full mx-auto py-8 gap-2"
    >
      <Stack.Screen options={{ headerTitle: 'Native Bricks Components' }} />
      <Input placeholder="Search for a component" value={search} onChangeText={setSearch} />
      {filteredComponents.map((component) => (
        <NavLink key={component.name} label={component.name} link={component.link} />
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
    link: '/components/Input',
  },
  {
    name: 'Select',
    description: 'A select input field.',
    link: '/components/Select',
  },
];
const NavLink = ({ label = '', link = '' }) => {
  return (
    <Link href={link} asChild>
      <View className="w-full p-3 border-b border-muted flex-row items-center justify-between bg-card rounded-radius">
        <Text>{label}</Text>
        <ChevronRightIcon className="w-5 h-5" />
      </View>
    </Link>
  );
};
