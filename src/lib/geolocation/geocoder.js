// @flow

import * as Location from 'expo-location';
import ToastService from '../../services/ToastService';
import I18n from '../I18n';

const convertGeocodeResultToAddress = ({
  city,
  name,
  country,
}: {
  city: string,
  name: string,
  country: string,
}): ?string => (name && city && country ? `${name}, ${city}, ${country}` : null);

export const findAddressesFromSearch = async (address: string): any => {
  try {
    const geocoderResults = await Location.geocodeAsync(address);
    if (geocoderResults && geocoderResults.length) {
      const results = (await Promise.all(
        geocoderResults.map(async ({ latitude, longitude }) => {
          try {
            const reversedGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
            if (reversedGeocode && reversedGeocode.length) {
              return {
                address: convertGeocodeResultToAddress(reversedGeocode[0]),
                location: { latitude, longitude },
              };
            }
            return null;
          } catch (e) {
            console.warn(e);
            return null;
          }
        })
      )).filter(Boolean);
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
