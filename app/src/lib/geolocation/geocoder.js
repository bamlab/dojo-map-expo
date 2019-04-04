// @flow

import { request } from 'graphql-request';
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
    const { allPlaces: places } = await request(
      'http://localhost:3000/graphql',
      `
        {
          allPlaces {
            id
            name
            address
            latitude
            longitude
          }
        }
      `);

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
