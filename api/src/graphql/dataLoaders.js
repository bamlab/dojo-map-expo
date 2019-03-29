// @flow

import { PlaceCategoryRepository } from '../modules/PlaceCategory/repository';

export const getDataLoaders = () => ({
  placeCategory: PlaceCategoryRepository.getDataLoaders(),
});
