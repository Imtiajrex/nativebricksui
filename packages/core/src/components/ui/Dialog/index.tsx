import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dialog as NativeDialog,
} from '~/components/base/dialog';

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
  const [isDialogOpen, setIsDialogOpen] = useState(props.open || false);
  const show = useCallback(() => setIsDialogOpen(true), [setIsDialogOpen]);
  const hide = useCallback(() => setIsDialogOpen(false), [setIsDialogOpen]);

  useImperativeHandle(
    ref,
    () => ({
      show,
      hide,
    }),
    [show, hide]
  );
  useEffect(() => {
    if (props.open !== undefined) {
      setIsDialogOpen(props.open);
    }
  }, [props.open]);
  useEffect(() => {
    if (props.onOpenChange) {
      props.onOpenChange(isDialogOpen);
    }
  }, [isDialogOpen]);

  return (
    <NativeDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
