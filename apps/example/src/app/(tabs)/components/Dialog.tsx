import { Button, Dialog, Input, toast } from '@nativebricks/core';
import { useRef } from 'react';
import { Text, View } from 'react-native';

export default function DialogPage() {
  const dialogRef = useRef<Dialog>(null);
  return (
    <View className="container">
      <Dialog
        title="Edit profile"
        ref={dialogRef}
        Footer={
          <Button
            onPress={() => {
              toast.error('Failed to save changes');
              dialogRef.current?.hide();
            }}
          >
            <Text className="font-bold">Save</Text>
          </Button>
        }
      >
        <Input placeholder="John Doe" />
        <Input placeholder="johdoe@example.com" />
      </Dialog>
      <Button
        onPress={() => {
          dialogRef.current?.show();
        }}
      >
        <Text className="font-bold">Open Dialog</Text>
      </Button>
    </View>
  );
}
