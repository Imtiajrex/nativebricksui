import { BottomSheet, Button, Input, toast } from '@nativebricks/core';
import React from 'react';
import { Modal, Text, View } from 'react-native';

export default function BottomSheetPage() {
  const dialogRef = React.useRef<BottomSheet>(null);
  return (
    <>
      <BottomSheet
        ref={dialogRef}
        containerClassName="bg-background"
        contentClassName="bg-background"
        isModal={false}
      >
        <Input label="Name" placeholder="John Doe" className="w-full" />
        <Input label="Email" />
        <Button
          onPress={() => {
            dialogRef.current?.hide();
            toast('Profile updated', {
              duration: 30000,
            });
          }}
          className="w-full"
        >
          <Text className="font-bold">Save</Text>
        </Button>
      </BottomSheet>
      <View className="container">
        <Button
          onPress={() => {
            dialogRef.current?.show();
          }}
        >
          <Text className="font-bold">Open Sheet</Text>
        </Button>
      </View>
    </>
  );
}
