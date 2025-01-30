import { Slider } from '@nativebricks/core/src/components/ui/Slider';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function AvatarPage() {
  const [value, setValue] = useState(0.5);
  return (
    <View className="container">
      <View className="gap-0.5">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-medium">Search Radius</Text>
          <Text>{Math.round(value)} km</Text>
        </View>
        <Slider
          animationType="spring"
          maximumValue={100}
          minimumValue={0}
          value={value}
          onValueChange={(value) => setValue(value[0])}
        />
      </View>
    </View>
  );
}
