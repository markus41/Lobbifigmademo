/**
 * Notification helper - Mantine notifications wrapper
 *
 * Drop-in replacement for sonner's toast API.
 * Maps toast.success/info/warning/error to Mantine notifications.show().
 */

import { notifications } from '@mantine/notifications';

export const toast = {
  success(message: string) {
    notifications.show({ message, color: 'green', autoClose: 4000 });
  },
  info(message: string) {
    notifications.show({ message, color: 'blue', autoClose: 4000 });
  },
  warning(message: string) {
    notifications.show({ message, color: 'yellow', autoClose: 5000 });
  },
  error(message: string) {
    notifications.show({ message, color: 'red', autoClose: 5000 });
  },
  message(message: string) {
    notifications.show({ message, autoClose: 4000 });
  },
  loading(message: string) {
    notifications.show({ message, loading: true, autoClose: false });
  },
};
