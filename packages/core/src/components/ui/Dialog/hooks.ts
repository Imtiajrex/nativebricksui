import { ForwardedRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

export const useDialog = (props: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  ref: ForwardedRef<any>;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(props.open || false);

  console.log(props.open, isDialogOpen);
  if (props.open !== undefined && props.open != isDialogOpen) {
    setIsDialogOpen(props.open);
  }
  useEffect(() => {
    if (props.onOpenChange) {
      props.onOpenChange(isDialogOpen);
    }
  }, [isDialogOpen]);
  const show = useCallback(() => setIsDialogOpen(true), [setIsDialogOpen]);
  const hide = useCallback(() => {
    if (props.open != undefined && props.onOpenChange) {
      props.onOpenChange(false);
    }
    setIsDialogOpen(false);
  }, [setIsDialogOpen, props.open, props.onOpenChange]);

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
