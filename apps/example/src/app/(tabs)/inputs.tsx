import {
  AlertDialog,
  ContextMenu,
  Dialog,
  MultiSelect,
  Paper,
  Select,
  Text,
  toast,
  Toaster,
} from '@nativebricks/core';
import React from 'react';
import { View } from 'react-native';

export default function Inputs() {
  const [selected, setSelected] = React.useState<string | undefined>(undefined);
  const [multiSelected, setMultiSelected] = React.useState<string[]>([]);
  return (
    <View className="p-4 pt-64 gap-2">
      <Select
        options={['Apple', 'Banana', 'Blueberry']}
        value={selected}
        onChange={(value) => {
          setSelected(value);
          toast.show({ message: value, type: 'info', placement: 'bottom center' });
        }}
        placeholder="Select a fruit"
      />
      <MultiSelect
        options={['Apple', 'Banana', 'Blueberry']}
        value={multiSelected}
        onChange={(value) => {
          setMultiSelected(value);
          toast.show({
            message: value.join(','),
            type: 'info',
            placement: 'bottom center',
          });
        }}
        placeholder="Select a fruit"
      />
      <Toaster />
      <ContextMenu>
        <Paper className={'h-44 p-3 items-center w-44 justify-center '}>
          <Text>Right Click Me</Text>
        </Paper>
      </ContextMenu>
      <Dialog
        trigger={
          <View className="p-3 rounded-radius bg-card shadow-sm">
            <Text>Show Dialog</Text>
          </View>
        }
      />
      <AlertDialog
        title="Do you want to delete this?"
        description="By deleting this, you are completely removing it from our database. You won't be able to recover it in any way"
        actionText="Confirm"
        onAction={() => {
          toast.show({
            message: 'Successfully delted the app',
            type: 'error',
          });
        }}
      >
        <Text>Show Alert Dialog</Text>
      </AlertDialog>
    </View>
  );
}
