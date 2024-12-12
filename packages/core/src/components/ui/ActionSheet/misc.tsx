import { useCallback } from 'react';
import { create } from 'zustand';
import { ActionSheet, ActionSheetProps } from './action-sheet';
type AlertType = {
  title?: string;
  description?: string;
  actions?: ActionSheetProps['actions'];
  cancelAction?: ActionSheetProps['cancelAction'];
};
export type AlertStoreType = {
  actionSheetDetails: AlertType | null;
};

const useAlertStore = create<AlertStoreType>((set) => ({
  actionSheetDetails: null,
}));
export const GlobalActionSheetProvider = () => {
  const actionSheetDetails = useAlertStore((state) => state.actionSheetDetails);
  const onOpenChange = useCallback(
    (open) => {
      if (!open) {
        useAlertStore.setState({ actionSheetDetails: null });
      }
    },
    [useAlertStore]
  );

  return (
    <ActionSheet {...actionSheetDetails} open={!!actionSheetDetails} onOpenChange={onOpenChange} />
  );
};

const actionsheet = function (actionSheetDetails: AlertType) {
  useAlertStore.setState({ actionSheetDetails });
};
actionsheet.close = () => {
  useAlertStore.setState({ actionSheetDetails: null });
};
export { actionsheet };
