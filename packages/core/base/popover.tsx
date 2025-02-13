import React from 'react';
import RNPopover, { PopoverMode, PopoverPlacement, Rect, Size } from '../primitivies/popover';

export type PopoverProps = React.ComponentProps<typeof RNPopover> & {
  children: React.ReactNode;
};
export function Popover(props: PopoverProps) {
  return (
    <RNPopover
      arrowSize={{
        width: 0,
        height: 0,
      }}
      placement={PopoverPlacement.BOTTOM}
      backgroundStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0)',
      }}
      {...props}
    >
      {props.children}
    </RNPopover>
  );
}
export { PopoverMode, PopoverPlacement, Rect, Size };
