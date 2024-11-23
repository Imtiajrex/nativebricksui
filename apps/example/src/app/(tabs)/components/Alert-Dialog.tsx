import { alert, AlertDialog, Button, toast } from '@nativebricks/core';
import React from 'react';
import { Text, View } from 'react-native';

export default function ActionSheetPage() {
  const dialogRef = React.useRef<AlertDialog>(null);
  return (
    <View className="container">
      <AlertDialog
        title="Are you sure you want to delete this item?"
        description="This action cannot be undone. Deleting this item will remove it from your account."
        buttons={[
          {
            text: 'Cancel',
            onPress: () => {
              dialogRef.current?.hide();
            },
          },
          {
            text: 'Delete',
            onPress: () => {
              toast.success('Item deleted successfully');
              dialogRef.current?.hide();
            },
          },
        ]}
        ref={dialogRef}
      />
      <Button
        onPress={() => {
          dialogRef.current?.show();
        }}
      >
        <Text className="font-bold">Open Alert With Ref</Text>
      </Button>
      <Button
        onPress={() => {
          alert({
            title: 'Global Alert',
            description: 'This is a global alert',
            buttons: [
              {
                text: 'Close',
                onPress: () => {
                  alert.close();
                },
              },
            ],
          });
        }}
      >
        <Text className="font-bold">Open Global Alert</Text>
      </Button>
    </View>
  );
}
