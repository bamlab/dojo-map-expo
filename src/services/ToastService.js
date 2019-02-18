// @flow

import React from 'react';
import SnackBar from '@bam.tech/react-native-snackbar-dialog';
import ToastComponent from '../components/Toast';

export default class ToastService {
  static show(
    message: string,
    error: ?boolean = false,
    colors?: { backgroundColor?: string, textColor?: string },
    onPress?: Function
  ) {
    SnackBar.show(message, {
      renderContent: () => <ToastComponent message={message} error={error} colors={colors} onPress={onPress} />,
    });
  }
  static showMessage(message: string, colors?: { backgroundColor?: string, textColor?: string }) {
    ToastService.show(message, false, colors);
  }
  static showError(message: string, colors?: { backgroundColor?: string, textColor?: string }) {
    ToastService.show(message, true, colors);
  }
}
