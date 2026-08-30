import { Input, PasswordInput, useColor } from '@nativebricks/core';
import React, { useState } from 'react';
import { View } from 'react-native';
import { User } from 'lucide-react-native';
import { PinInput } from '@nativebricks/core';

export default function InputPage() {
  const [code, setCode] = useState('');
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
      <PasswordInput
        isTogglePasswordButtonEnabled
        autoComplete="off"
        importantForAutofill="noExcludeDescendants"
      />
      <PinInput
        pin={code}
        onPinChange={setCode}
        numberOfPins={4}
        check={(code) => console.log('checking', code)}
        secret
      />
    </View>
  );
}
