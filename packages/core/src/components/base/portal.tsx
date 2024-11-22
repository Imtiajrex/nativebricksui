import { PortalHost as RNPortal } from '@rn-primitives/portal';
import { Toaster } from './sonner';

export const PortalHost = () => {
  return (
    <>
      <RNPortal />
      <Toaster position="top-center" swipeToDismissDirection="left" />
    </>
  );
};
