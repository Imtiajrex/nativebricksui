import { Avatar, Progress } from '@nativebricks/core';
import React from 'react';
import { View } from 'react-native';

export default function ProgressPage() {
  return (
    <View className="container">
      <Progress value={20} max={100} className="h-2" />
    </View>
  );
}
