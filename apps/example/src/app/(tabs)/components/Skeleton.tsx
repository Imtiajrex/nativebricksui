import { Skeleton } from '@nativebricks/core';
import React, { useState } from 'react';
import { View } from 'react-native';

export default function SkeletonPage() {
  return (
    <View className="container">
      <Skeleton className={'max-w-sm w-full h-24'} />
      <Skeleton className={'w-20 h-20 rounded-full'} />
    </View>
  );
}
