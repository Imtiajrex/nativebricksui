import { forwardRef } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dialog as NativeDialog,
} from '~/components/base/dialog';
import { useDialog } from './hooks';

export type DialogProps = {
  title?: string;
  description?: string;
  open?: boolean;
  Header?: React.ReactNode;
  Footer?: React.ReactNode;
  children?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
};
export type Dialog = {
  show: () => void;
  hide: () => void;
};
export const Dialog = forwardRef<Dialog, DialogProps>((props, ref) => {
  const { isDialogOpen, onOpenChange } = useDialog({
    open: props.open,
    onOpenChange: props.onOpenChange,
    ref,
  });

  return (
    <NativeDialog open={isDialogOpen} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-[425px] min-w-[250px] w-full">
        <DialogHeader>
          {props.title && <DialogTitle>{props.title}</DialogTitle>}
          {props.description && <DialogDescription>{props.description}</DialogDescription>}
          {props.Header}
        </DialogHeader>
        {props.children}
        <DialogFooter>{props.Footer}</DialogFooter>
      </DialogContent>
    </NativeDialog>
  );
});
