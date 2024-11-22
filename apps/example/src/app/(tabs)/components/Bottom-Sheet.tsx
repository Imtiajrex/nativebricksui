import { BottomSheet, Button, Input, toast } from '@nativebricks/core';
import React from 'react';
import { Text, View } from 'react-native';

export default function BottomSheetPage() {
  const dialogRef = React.useRef<BottomSheet>(null);
  return (
    <View className="container">
      <BottomSheet title="Edit profile" ref={dialogRef}>
        <Input label="Name" placeholder="John Doe" />
        <Input label="Email" />
        <Button
          onPress={() => {
            dialogRef.current?.hide();
            toast('Profile updated');
          }}
        >
          <Text className="font-bold">Save</Text>
        </Button>
      </BottomSheet>
      <Button
        onPress={() => {
          dialogRef.current?.show();
        }}
      >
        <Text className="font-bold">Open Sheet</Text>
      </Button>
    </View>
  );
}
