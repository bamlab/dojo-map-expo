// @flow

import { PlaceController } from './controller';

export default {
  Query: {
    allPlaces: (_: void, options: void, ctx: ContextType): Promise<PlaceType[]> =>
      PlaceController.findAll(ctx),
  },
};
