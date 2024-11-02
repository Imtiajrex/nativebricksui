import { Portal } from '@rn-primitives/portal';
import * as ToastPrimitive from '@rn-primitives/toast';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { LinearTransition, ZoomInEasyUp, ZoomOutRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { create } from 'zustand';
import { cn } from '../utils/cn';

type ToastStoreType = {
  toasts: ToastType[];
  addToast: (toast: ToastType) => void;
  removeToast: (id: string) => void;
};
const useToastStore = create<ToastStoreType>((set) => ({
  toasts: [],
  addToast: (toast) => {
    set((state) => {
      const filteredToasts = state.toasts.filter((t) =>
        t.placement.includes(toast.placement.includes('top') ? 'top' : 'bottom')
      );
      if (filteredToasts.length > 4) {
        state.toasts.pop();
        return { toasts: [toast, ...state.toasts] };
      }
      return { toasts: [toast, ...state.toasts] };
    });
  },
  removeToast: (id) => {
    set((state) => {
      const toasts = state.toasts.filter((toast) => toast.id !== id);
      return { toasts };
    });
  },
}));
export const toast = {
  show: (toast: Omit<ToastType, 'id'>) => {
    useToastStore.getState().addToast({
      duration: 3000,
      placement: 'top center',
      ...toast,
      id: Math.random().toString(),
    });
  },
};
export function Toaster() {
  return (
    <Portal name="toast">
      <Toasts placement="top" />
      <Toasts placement="bottom" />
    </Portal>
  );
}

const placementClasses = {
  'top left': 'items-start',
  'top center': 'items-center',
  'top right': 'items-end',
  'bottom left': 'items-start',
  'bottom center': 'items-center',
  'bottom right': 'items-end',
};
const Toasts = ({ placement }: { placement: 'top' | 'bottom' }) => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);
  const insets = useSafeAreaInsets();
  const filteredToasts = toasts.filter((toast) => toast.placement.includes(placement));
  return (
    <View
      className={cn('absolute w-full p-4 gap-2', placement.includes('top') ? 'top-0' : 'bottom-0')}
      style={{
        [placement.includes('top') ? 'top' : 'bottom']: placement.includes('top')
          ? insets.top
          : insets.bottom,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      {filteredToasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          remove={() => {
            removeToast(toast.id);
          }}
        />
      ))}
    </View>
  );
};
type PlacementType =
  | 'top left'
  | 'top center'
  | 'top right'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right';
type ToastType = {
  id: string;
  message: string;
  placement?: PlacementType;
  description?: string;
  duration?: number;
  type: 'info' | 'success' | 'warning' | 'error';
};
type ToastProps = ToastType & {
  remove: () => void;
};
const Toast = (props: ToastProps) => {
  useEffect(() => {
    let interval = setTimeout(() => {
      props.remove();
    }, props.duration);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <Animated.View
      layout={LinearTransition.springify().duration(180)}
      entering={ZoomInEasyUp.springify().duration(180)}
      exiting={ZoomOutRight.springify().duration(180)}
      className={cn('w-full', placementClasses[props.placement || 'top center'])}
    >
      <ToastPrimitive.Root
        open={true}
        onOpenChange={(open) => {
          if (!open) {
            props.remove();
          }
        }}
        type="foreground"
        className="bg-card border-border border flex-row justify-between max-w-sm  w-full items-center px-3 py-2 rounded-radius"
      >
        <View className="gap-0.5">
          <ToastPrimitive.Title className="text-foreground text-sm">
            {props.message}
          </ToastPrimitive.Title>
          <ToastPrimitive.Description className="text-muted-foreground text-xs">
            {props.description}
          </ToastPrimitive.Description>
        </View>
        <ToastPrimitive.Close className="border border-primary px-2 py-1 rounded-radius">
          <Text className="text-foreground text-sm">Close</Text>
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
    </Animated.View>
  );
};
