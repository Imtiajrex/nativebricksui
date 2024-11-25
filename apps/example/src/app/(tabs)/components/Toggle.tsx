import { Accordion, Toggle, ToggleIcon } from '@nativebricks/core';
import React from 'react';
import { View } from 'react-native';
import { CheckCircle } from 'lucide-react-native';

export default function TogglePage() {
  const [selected, setSelected] = React.useState(false);
  return (
    <View className="container">
      <Toggle pressed={selected} onPressedChange={setSelected} className="w-24">
        <ToggleIcon icon={CheckCircle} size={15} />
      </Toggle>
    </View>
  );
}
