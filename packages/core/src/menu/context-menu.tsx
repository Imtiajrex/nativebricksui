import * as ContextMenuPrimitive from '@rn-primitives/context-menu';
import * as React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';

export function ContextMenu() {
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [subCheckboxValue, setSubCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('pedro');

  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger>
        <Text>{Platform.OS === 'web' ? 'Right click here' : 'Long press here'}</Text>
      </ContextMenuPrimitive.Trigger>

      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Overlay
          className="bg-black/50 backdrop:blur-2xl"
          style={StyleSheet.absoluteFill}
        >
          <ContextMenuPrimitive.Content className="bg-card p-3 rounded-radius border border-border">
            <ContextMenuPrimitive.Item>
              <Text>Back</Text>
            </ContextMenuPrimitive.Item>
            <ContextMenuPrimitive.Item>
              <Text>Forward</Text>
            </ContextMenuPrimitive.Item>
            <ContextMenuPrimitive.Item>
              <Text>Reload</Text>
            </ContextMenuPrimitive.Item>

            <ContextMenuPrimitive.Sub>
              <ContextMenuPrimitive.SubTrigger>
                <Text>More Tools</Text>
              </ContextMenuPrimitive.SubTrigger>
              <ContextMenuPrimitive.SubContent>
                <ContextMenuPrimitive.Item>
                  <Text>Save Page As...</Text>
                </ContextMenuPrimitive.Item>
                <ContextMenuPrimitive.Item>
                  <Text>Create Shortcut...</Text>
                </ContextMenuPrimitive.Item>

                <ContextMenuPrimitive.Separator />
                <ContextMenuPrimitive.Item>
                  <Text>Developer Tools</Text>
                </ContextMenuPrimitive.Item>
              </ContextMenuPrimitive.SubContent>
            </ContextMenuPrimitive.Sub>

            <ContextMenuPrimitive.Separator />
            <ContextMenuPrimitive.CheckboxItem
              checked={checkboxValue}
              onCheckedChange={setCheckboxValue}
              closeOnPress={false}
            >
              <Text>Show Bookmarks Bar</Text>
            </ContextMenuPrimitive.CheckboxItem>
            <ContextMenuPrimitive.CheckboxItem
              checked={subCheckboxValue}
              onCheckedChange={setSubCheckboxValue}
              closeOnPress={false}
            >
              <Text>Show Full URLs</Text>
            </ContextMenuPrimitive.CheckboxItem>
            <ContextMenuPrimitive.Separator />
            <ContextMenuPrimitive.RadioGroup value={radioValue} onValueChange={setRadioValue}>
              <ContextMenuPrimitive.Label>People</ContextMenuPrimitive.Label>
              <ContextMenuPrimitive.Separator />
              <ContextMenuPrimitive.RadioItem value="pedro" closeOnPress={false}>
                <Text>Elmer Fudd</Text>
              </ContextMenuPrimitive.RadioItem>
              <ContextMenuPrimitive.RadioItem value="colm" closeOnPress={false}>
                <Text>Foghorn Leghorn</Text>
              </ContextMenuPrimitive.RadioItem>
            </ContextMenuPrimitive.RadioGroup>
          </ContextMenuPrimitive.Content>
        </ContextMenuPrimitive.Overlay>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  );
}
