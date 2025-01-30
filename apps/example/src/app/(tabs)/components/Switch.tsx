import { Switch } from '@nativebricks/core';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function SwitchPage() {
  const [checked, setChecked] = useState(false);
  return (
    <View className="container">
      <Switch checked={checked} onCheckedChange={setChecked} />
    </View>
  );
}
