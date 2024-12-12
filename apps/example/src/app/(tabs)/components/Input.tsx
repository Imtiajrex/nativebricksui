import { Input } from '@nativebricks/core';
import React from 'react';
import { View } from 'react-native';

export default function InputPage() {
  return (
    <View className="container">
      <View className=" flex-1 p-2">
        <Input label="Full Name" placeholder="Ex: John Doe" helperText="Enter your full name" />
        <Input label="Email" placeholder="Ex: example@gmail.com" message="Invalid Email" error />
        <Input label="Password" message="Password looks good!" success />
      </View>
    </View>
  );
}
