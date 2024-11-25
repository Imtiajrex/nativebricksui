import { Checkbox } from '@nativebricks/core';
import React from 'react';
import { View } from 'react-native';

export default function CheckboxPage() {
  const [checked, setChecked] = React.useState(false);
  return (
    <View className="container">
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        label="By checking this box, you agree to the terms and conditions"
      />
    </View>
  );
}
