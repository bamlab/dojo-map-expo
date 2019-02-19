// @flow

import ToastService from '../../services/ToastService';
import I18n from '../I18n';
import { Location } from 'expo';


// You can use geocodeAsync in conjonction with reverseGeocodeAsync to get a better address format
export const findAddressesFromSearch = (address: string): Promise<any> => {
  return Location.geocodeAsync(address)
    .then(geocoderResults => {
      if (geocoderResults) {
        const results =
          geocoderResults.length &&
          geocoderResults.filter(Boolean);
        if (!results || !results.length) throw new Error('ZERO_RESULTS');
        return results.map(({ latitude, longitude }) => ({
          address: `${latitude}/${longitude}`,
          location: { latitude, longitude },
        }));
      } else {
        throw new Error(`Error while geocoding ${address}. Query result was ` + JSON.stringify(geocoderResults));
      }
    })
    .catch(error => {
      if (!error.message.includes('ZERO_RESULTS')) {
        console.warn(error);
        ToastService.showError(I18n.t('ChooseAddress.error'));
      }
    });
};
