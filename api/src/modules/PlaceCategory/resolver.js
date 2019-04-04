// @flow

import { PlaceCategoryController } from './controller';

export default {
  Query: {
    allPlaceCategories: (_: void, args: void, ctx: ContextType): Promise<PlaceCategoryType[]> =>
      PlaceCategoryController.findAll(ctx),
  },
  Place: {
    category: (place: PlaceType, args: void, ctx: ContextType): Promise<?PlaceCategoryType> => PlaceCategoryController.findByPlace(place, ctx),
  },
};
