import { Accordion, Toggle, ToggleGroup, ToggleGroupItem, ToggleIcon } from '@nativebricks/core';
import React, { useState } from 'react';
import { View } from 'react-native';
import { CheckCircle, CheckCircle2, MapPin } from 'lucide-react-native';

export default function ToggleGroupPage() {
  const [selected, setSelected] = useState('');
  return (
    <View className="container">
      <ToggleGroup type="single" value={selected} onValueChange={setSelected}>
        <ToggleGroupItem value="1">
          <ToggleIcon icon={CheckCircle} size={15} color="black" />
        </ToggleGroupItem>
        <ToggleGroupItem value="2">
          <ToggleIcon icon={MapPin} size={15} color="black" />
        </ToggleGroupItem>
      </ToggleGroup>
    </View>
  );
}
