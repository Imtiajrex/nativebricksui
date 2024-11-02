import * as TooltipPrimitive from '@rn-primitives/tooltip';
import { Text } from 'react-native';
import { Paper } from '../layout';
export type TooltipProps = {
  children: React.ReactNode;
  label: string;
};
export function Tooltip({ children, label }: TooltipProps) {
  return (
    <TooltipPrimitive.Root delayDuration={300}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content className="w-max flex-none" asChild sideOffset={4}>
          <Paper rounded className={'px-2 py-1 flex-none'}>
            <Text className="text-sm">{label}</Text>
          </Paper>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
