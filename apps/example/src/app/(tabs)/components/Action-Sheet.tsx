import { actionsheet, ActionSheet, Button, toast } from '@nativebricks/core';
import React from 'react';
import { Text, View } from 'react-native';

export default function ActionSheetPage() {
  const dialogRef = useRef<ActionSheet>(null);
  return (
    <View className="container">
      <ActionSheet
        title="Edit profile"
        description='Would you like to "Edit" or "Save" your changes?'
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
        <Text className="font-bold">Open Actions With Ref</Text>
      </Button>
      <Button
        onPress={() => {
          actionsheet({
            title: 'Edit profile',
            actions: [
              {
                label: 'Edit',
                onPress: () => {
                  toast.error('Failed to save changes');
                  actionsheet.close();
                },
              },
              {
                label: 'Save',
                onPress: () => {
                  toast.success('Changes saved successfully');
                  actionsheet.close();
                },
              },
            ],
          });
        }}
        variant="outline"
      >
        <Text className="font-bold">Open Global Action</Text>
      </Button>
    </View>
  );
}
