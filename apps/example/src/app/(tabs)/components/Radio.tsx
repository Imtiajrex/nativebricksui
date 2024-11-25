import { Button, Radio } from '@nativebricks/core';
import { Check } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
export default function AvatarPage() {
  const [option, setOption] = React.useState('option1');
  return (
    <View className="container">
      <Radio
        options={[
          {
            label: 'Option 1',
            value: 'option1',
          },
          {
            label: 'Option 2',
            value: 'option2',
          },
          {
            label: 'Option 3',
            value: 'option3',
          },
        ]}
        value={option}
        onValueChange={setOption}
      />
      <Radio
        options={['free', 'pro', 'organization']}
        value={option}
        onValueChange={setOption}
        containerClassName="flex-row flex-wrap"
        renderOption={({ option, isActive, select }) => {
          const data = PricingMap[option as keyof typeof PricingMap];
          return (
            <Pressable
              onPress={select}
              className={`flex-col gap-1 p-4 min-w-64 flex-1 rounded-xl border bg-card ${
                isActive ? 'border-primary' : ' border-transparent'
              }`}
            >
              <Text className="text-lg font-bold">{data.title}</Text>
              <Text className="text-sm font-medium mb-2">{data.price} / Month</Text>
              {data.benefits.map((benefit) => (
                <View className="flex-row items-center gap-1">
                  <Check className="w-3 h-3" />
                  <Text key={benefit} className="text-sm text-muted-foreground">
                    {benefit}
                  </Text>
                </View>
              ))}
              <Button onPress={select} variant="outline">
                <Text className="text-sm font-medium">Select</Text>
              </Button>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const PricingMap = {
  free: {
    title: 'Free',
    benefits: ['10 users included', '2 GB of storage', 'Email support', 'Help center access'],

    price: '$0',
  },

  pro: {
    title: 'Pro',
    benefits: [
      '20 users included',
      '10 GB of storage',
      'Priority email support',
      'Help center access',
    ],
    price: '$15',
  },
  organization: {
    title: 'Organization',
    benefits: [
      '50 users included',
      '30 GB of storage',
      'Phone and email support',
      'Help center access',
    ],
    price: '$29',
  },
};
