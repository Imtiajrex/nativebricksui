import { forwardRef } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dialog as NativeDialog,
} from '../../base/dialog';
import { cn } from '../../../lib/utils';
import { useDialog } from './hooks';

export type DialogProps = {
  title?: string;
  description?: string;
  open?: boolean;
  Header?: React.ReactNode;
  Footer?: React.ReactNode;
  children?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  headerClassName?: string;
  footerClassName?: string;
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
  const showHeader = props.title || props.description || props.Header;

  return (
    <NativeDialog open={isDialogOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn('md:max-w-[425px] min-w-[250px] w-full', props.className)}
        overlayClassName="p-0"
      >
        {showHeader && (
          <DialogHeader className={cn(props.headerClassName)}>
            {props.title && <DialogTitle className="text-foreground">{props.title}</DialogTitle>}
            {props.description && (
              <DialogDescription className="text-foreground">{props.description}</DialogDescription>
            )}
            {props.Header}
          </DialogHeader>
        )}
        {props.children}
        {props.Footer && (
          <DialogFooter className={props.footerClassName}>{props.Footer}</DialogFooter>
        )}
      </DialogContent>
    </NativeDialog>
  );
});
