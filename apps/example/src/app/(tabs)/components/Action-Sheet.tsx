import { ActionSheet, Button, Dialog, Input, toast } from '@nativebricks/core';
import React from 'react';
import { Text, View } from 'react-native';

export default function ActionSheetPage() {
  const dialogRef = React.useRef<ActionSheet>(null);
  return (
    <View className="container">
      <ActionSheet
        title="Edit profile"
        ref={dialogRef}
        actions={[
          {
            label: 'Edit',
            onPress: () => {
              toast.error('Failed to save changes');
              dialogRef.current?.hide();
            },
          },
          {
            label: 'Save',
            onPress: () => {
              toast.success('Changes saved successfully');
              dialogRef.current?.hide();
            },
          },
        ]}
      />
      <Button
        onPress={() => {
          dialogRef.current?.show();
        }}
      >
        <Text className="font-bold">Open Actions</Text>
      </Button>
    </View>
  );
}
