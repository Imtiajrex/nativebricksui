import { PortalHost as RNPortal } from '../../../components/base/portal';
import { Toaster } from '../../../components/base/sonner';
import { GlobalActionSheetProvider } from '../ActionSheet/misc';
import { GlobalAlertProvider } from '../AlertDialog/misc';

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
