import { PortalHost as RNPortal } from '@rn-primitives/portal';
import { Toaster } from '~/components/base/sonner';
import { GlobalAlertProvider } from '../AlertDialog/misc';
import { GlobalActionSheetProvider } from '../ActionSheet/misc';

export const PortalHost = () => {
  return (
    <>
      <RNPortal />
      <Toaster position="top-center" swipeToDismissDirection="left" />
      <GlobalAlertProvider />
      <GlobalActionSheetProvider />
    </>
  );
};
