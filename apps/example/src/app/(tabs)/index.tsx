import {
  Button,
  Center,
  CloseButton,
  Container,
  Divider,
  Paper,
  Tooltip,
} from '@nativebricks/core';
import React from 'react';
import { Text } from 'react-native';

export default function index() {
  return (
    <Container className="px-4 gap-4 pt-12">
      <Center className="h-44 bg-green-400 rounded-2xl p-3">
        <Text>Center Text</Text>
      </Center>
      <Paper shadow border rounded className="gap-1 p-4">
        <CloseButton className="absolute right-2 top-2 z-10" size="sm" />
        <Text>Paper Text</Text>
        <Text>2nd Paper Text</Text>
        <Divider />
        <Text>3rd Paper Text</Text>
        <Button variant="light">Get Started</Button>
      </Paper>
      <Tooltip label="Google It" placement="top">
        <Text>Hover Me</Text>
      </Tooltip>
    </Container>
  );
}
