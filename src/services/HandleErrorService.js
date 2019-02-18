// @flow

import { debounce } from 'lodash';
import Toast from './ToastService';
import I18n from '../lib/I18n';

type DefaultHandlerType = (error: ?APIErrorsType) => ?string;
type NativeEventType = { description?: string, domain?: string };

export default class HandleErrorService {
  static isNoNetworkError(error: TypeError | Response | { nativeEvent: NativeEventType }): boolean {
    return (
      (error instanceof TypeError &&
        (error.message === 'Network request failed' || // react native
        error.message === 'Failed to fetch' || // chrome
        error.message === 'Type error' || // safari
          error.message === 'NetworkError when attempting to fetch resource.')) || // firefox
      (!!error.nativeEvent &&
        (error.nativeEvent.domain === 'NSURLErrorDomain' || // iOS
          // $FlowFixMe
          error.nativeEvent.description === 'net::ERR_ADDRESS_UNREACHABLE')) // Android
    );
  }
  static isNoBackConnectionError(error: Response): boolean {
    return !error.status;
  }

  static isServerUnreachableError(error: TypeError | Response): boolean {
    return HandleErrorService.isNoNetworkError(error) || HandleErrorService.isNoBackConnectionError(error);
  }

  static sendDefault(error: ?APIErrorsType, defaultHandler: ?(error: ?APIErrorsType) => ?string) {
    const defaultMessage = I18n.t('Error.default');
    if (!defaultHandler) {
      return defaultMessage;
    }
    return defaultHandler(error) || defaultMessage;
  }

  static getErrorMessage(error: ?APIErrorsType, defaultHandler: ?DefaultHandlerType) {
    const translateError = text => I18n.t(`Error.${text}`);

    if (!error) {
      return HandleErrorService.sendDefault(error, defaultHandler);
    }

    if (HandleErrorService.isNoNetworkError(error)) {
      return translateError('noNetwork');
    } else if (error instanceof TypeError || error instanceof Error) {
      return HandleErrorService.sendDefault(error, defaultHandler);
    } else if (HandleErrorService.isNoBackConnectionError(error)) {
      return translateError('unableToJoinServer');
    } else if (error.status >= 500) {
      return translateError('error500');
    }
    return HandleErrorService.sendDefault(error, defaultHandler);
  }

  static showToastErrorBounced(error: ?APIErrorsType, defaultHandler: ?DefaultHandlerType) {
    Toast.showError(HandleErrorService.getErrorMessage(error, defaultHandler));
  }

  static showToastError = debounce(HandleErrorService.showToastErrorBounced, 2000);
}
