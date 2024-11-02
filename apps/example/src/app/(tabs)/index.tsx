import {
  Badge,
  Button,
  Center,
  Checkbox,
  Chip,
  CloseButton,
  Container,
  Divider,
  FlatList,
  HStack,
  Input,
  Paper,
  Pill,
  Switch,
  Tooltip,
} from '@nativebricks/core';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function index() {
  const [checked, setChecked] = React.useState(false);
  return (
    <ScrollView className="flex-1" contentContainerClassName=" pb-24">
      <Container className="px-4 gap-4 pt-12">
        <Center className="h-44 bg-green-400 rounded-2xl p-3">
          <Text>Center Text</Text>
        </Center>
        <Paper shadow border rounded className="gap-1 p-4 ">
          <CloseButton className="absolute right-2 top-2 z-10" size="sm" />
          <Text>Paper Text</Text>
          <Text>2nd Paper Text</Text>
          <Divider />
          <Text>3rd Paper Text</Text>
          <Button variant="default">Get Started</Button>
        </Paper>
        <HStack className="gap-2">
          <Badge>React</Badge>
          <Badge variant="light" size="sm">
            Native
          </Badge>
          <Badge variant="destructive" size="xs">
            Svelte
          </Badge>
          <Badge variant="outline" size="lg">
            Remix
          </Badge>
          <Badge variant="secondary" size="xl">
            Remix
          </Badge>
          <Badge>1</Badge>
        </HStack>
        <Checkbox label="Checkbox" checked={checked} onChange={(checked) => setChecked(checked)} />
        <Tooltip label="A test tooltip">
          <Badge>Tool Tip Test</Badge>
        </Tooltip>
        <Chip
          label="Chip"
          checked={checked}
          onChange={(checked) => setChecked(checked)}
          variant="destructive"
        />
        <Input
          label="Name"
          description="Enter your full name"
          valid
          validMessage="Looks good!"
          withAsterisk
          placeholder="John Doe"
        />
        <View className="items-center justify-center w-44 h-32 bg-background rounded-2xl p-4 overflow-hidden">
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            renderItem={({ item }) => (
              <Paper shadow border rounded className="h-24 w-24 p-2 mr-2">
                <Text selectable={false}>{item}</Text>
              </Paper>
            )}
            decelerationRate={'fast'}
            snapToInterval={96 + 8}
            horizontal
            style={{
              width: 120,
            }}
          />
        </View>
        <Pill withRemoveButton variant="card">
          Pill
        </Pill>
        <Switch label="Switch" size="md" />
      </Container>
    </ScrollView>
  );
}
