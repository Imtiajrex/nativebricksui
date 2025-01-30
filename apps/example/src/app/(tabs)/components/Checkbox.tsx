import { Checkbox } from '@nativebricks/core';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function CheckboxPage() {
  const [checked, setChecked] = useState(false);
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
