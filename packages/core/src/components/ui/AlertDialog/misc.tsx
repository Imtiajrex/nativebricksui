import { create } from 'zustand';
import { AlertDialog, AlertDialogProps } from '.';
type AlertType = {
  title?: string;
  description?: string;
  buttons?: AlertDialogProps['buttons'];
};
export type AlertStoreType = {
  alertDetails: AlertType | null;
};

const useAlertStore = create<AlertStoreType>((set) => ({
  alertDetails: null,
}));
export const GlobalAlertProvider = () => {
  const alertDetails = useAlertStore((state) => state.alertDetails);

  return <AlertDialog {...alertDetails} open={!!alertDetails} />;
};

const alert = function (alertDetails: AlertType) {
  useAlertStore.setState({
    alertDetails: {
      ...alertDetails,
      buttons: !alertDetails?.buttons?.length
        ? [
            {
              onPress: () => alert.close(),
              text: 'Ok',
            },
          ]
        : alertDetails?.buttons,
    },
  });
};
alert.close = () => {
  useAlertStore.setState({ alertDetails: null });
};
export { alert };
