import { Input, useColor } from '@nativebricks/core';
import React, { useState } from 'react';
import { View } from 'react-native';
import { User } from 'lucide-react-native';

export default function InputPage() {
  return (
    <View className="container">
      <Input
        placeholder="Ex: John Doe"
        leading={
          <View className="p-2">
            <User size={24} color={useColor('muted-foreground')} />
          </View>
        }
      />
      <Input placeholder="Ex: example@gmail.com" state="invalid" />
      <Input />
    </View>
  );
}
