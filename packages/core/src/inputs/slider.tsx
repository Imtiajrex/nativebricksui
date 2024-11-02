import * as NativeSlider from '@rn-primitives/slider';
import * as React from 'react';
import { Platform, Text, View } from 'react-native';

export function Slider() {
  const [value, setValue] = React.useState(50);

  return (
    <View>
      <Text>{Math.round(value)}</Text>
      <NativeSlider.Root
        value={value}
        onValueChange={(vals) => {
          const nextValue = vals[0];
          if (typeof nextValue !== 'number') return;
          setValue(nextValue);
        }}
      >
        <NativeSlider.Track className="w-full bg-card p-0.5 rounded-full justify-center">
          <NativeSlider.Range
            style={{ width: `${value}%` }}
            className="h-2 bg-primary rounded-full"
          />
          <NativeSlider.Thumb
            style={{ left: `${value > 99 ? value - value : value}%` }}
            className="w-4 h-4 bg-primary rounded-full"
          />
        </NativeSlider.Track>
      </NativeSlider.Root>

      {Platform.OS !== 'web' && <Text>You will have to implement the gesture handling</Text>}
    </View>
  );
}
