// @flow

import ToastService from '../../services/ToastService';
import I18n from '../I18n';
import geolocationClient from './geolocationClient';

export const findAddressesFromSearch = (address: string): Promise<any> => {
  return geolocationClient
    .geocodeAddress(address)
    .then(geocoderResults => {
      if (geocoderResults) {
        const results =
          geocoderResults.length &&
          geocoderResults.filter(
            ({ countryCode, formattedAddress, position }) => countryCode === 'FR' && formattedAddress && position
          );
        if (!results || !results.length) throw new Error('ZERO_RESULTS');
        return results.map(({ formattedAddress, position }) => ({
          address: formattedAddress,
          location: { latitude: position.lat, longitude: position.lng },
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
