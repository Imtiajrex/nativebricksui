import { ForwardedRef, useCallback, useImperativeHandle, useState } from 'react';

export const useDialog = (props: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  ref: ForwardedRef<any>;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(props.open || false);

  if (props.open !== undefined && props.open != isDialogOpen) {
    setIsDialogOpen(props.open);
  }

  const show = useCallback(() => setIsDialogOpen(true), [setIsDialogOpen]);
  const hide = useCallback(() => setIsDialogOpen(false), [setIsDialogOpen]);

  useImperativeHandle(
    props.ref,
    () => ({
      show,
      hide,
    }),
    [show, hide]
  );
  const onOpenChange = useCallback(
    (open: boolean) => {
      setIsDialogOpen(open);
      if (props.onOpenChange) {
        props.onOpenChange(open);
      }
    },
    [props.onOpenChange]
  );
  return {
    isDialogOpen,
    setIsDialogOpen,
    onOpenChange,
    show,
    hide,
  };
};
