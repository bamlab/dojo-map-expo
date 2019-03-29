// @flow

import createPlaces from './places';
import createPlaceCategories from './placeCategories';

export const seeds = async () => {
  await createPlaceCategories();
  await createPlaces();
};
