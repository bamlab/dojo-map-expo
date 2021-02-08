// @flow

import * as Location from 'expo-location';
import ToastService from '../../services/ToastService';
import I18n from '../I18n';

export const findAddressesFromSearch = async (address: string): any => {
  try {
    const geocoderResults = await Location.geocodeAsync(address);
    if (geocoderResults && geocoderResults.length) {
      const results = [];
      //const results = (await Promise.all()).filter(Boolean);
      if (!results || !results.length) throw new Error('ZERO_RESULTS');
      return results;
    } else {
      throw new Error(`Error while geocoding ${address}. Query result was ` + JSON.stringify(geocoderResults));
    }
  } catch (error) {
    if (!error.message.includes('ZERO_RESULTS')) {
      console.warn(error);
      ToastService.showError(I18n.t('ChooseAddress.error'));
    }
  }
};
