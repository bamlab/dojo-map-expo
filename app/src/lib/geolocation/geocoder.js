// @flow

import ToastService from '../../services/ToastService';
import I18n from '../I18n';

const convertResultsToAddress = ({
  id,
  name,
  address,
  latitude,
  longitude,
}: {
  id: string,
  name: string,
  address: string,
  latitude: number,
  longitude: number,
}): ?string => (id && name && address) ? ({ id, address: `${name}, ${address}`, location: { latitude, longitude } }) : null;

export const findAddressesFromSearch = async (search: string): any => {
  try {
    const { allPlaces: places } = {
      allPlaces: [
        {
          id: 'toto',
          name: 'BAM',
          address: '48 boulevard des Batignolles, 75017, Paris',
          latitude: 48.88269,
          longitude: 2.30483,
        },
      ],
    };

    const addresses = places.map(convertResultsToAddress).filter(Boolean);

    if (!addresses.length) {
      throw new Error('ZERO_RESULTS');
    }

    return addresses;
  } catch (error) {
    if (!error.message.includes('ZERO_RESULTS')) {
      console.warn(error);
      ToastService.showError(I18n.t('ChooseAddress.error'));
    }
  }
};
