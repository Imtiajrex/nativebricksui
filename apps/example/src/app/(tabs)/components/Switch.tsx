import { Switch } from '@nativebricks/core';
import React from 'react';
import { View } from 'react-native';

export default function SwitchPage() {
  const [checked, setChecked] = React.useState(false);
  return (
    <View className="container">
      <Switch checked={checked} onCheckedChange={setChecked} />
    </View>
  );
}
