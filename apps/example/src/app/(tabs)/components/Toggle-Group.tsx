import { Accordion, Toggle, ToggleIcon } from '@nativebricks/core';
import React from 'react';
import { View } from 'react-native';
import { CheckCircle } from 'lucide-react-native';

export default function ToggleGroupPage() {
  const [selected, setSelected] = React.useState(false);
  return (
    <View className="container">
      <Toggle pressed={selected} onPressedChange={setSelected}>
        <ToggleIcon icon={CheckCircle} size={15} />
      </Toggle>
    </View>
  );
}
