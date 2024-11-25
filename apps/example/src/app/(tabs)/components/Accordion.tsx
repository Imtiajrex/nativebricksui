import { Accordion } from '@nativebricks/core';
import React from 'react';
import { View } from 'react-native';

export default function AccordionPage() {
  return (
    <View className="container">
      <Accordion
        data={[
          {
            content: 'Content 1',
            title: 'Title 1',
            value: '1',
          },
          {
            content: 'Content 2',
            title: 'Title 2',
            value: '2',
          },
          {
            content: 'Content 3',
            title: 'Title 3',
            value: '3',
          },
        ]}
        type="multiple"
        className="bg-card rounded-radius p-4 "
      />
    </View>
  );
}
