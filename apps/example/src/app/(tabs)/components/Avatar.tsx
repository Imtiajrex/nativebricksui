import { Avatar } from '@nativebricks/core';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function AvatarPage() {
  return (
    <View className="container">
      <Avatar
        alt="John Doe"
        fallbackText="JD"
        source={{ uri: 'https://picsum.photos/200/300' }}
        className="w-20 bg-card"
        fallbackClassName="bg-card"
      />
    </View>
  );
}
