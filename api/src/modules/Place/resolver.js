// @flow

import { PlaceController } from './controller';

export default {
  Query: {
    allPlaces: (_: void, args: void, ctx: ContextType): Promise<PlaceType[]> =>
      PlaceController.findAll(ctx),
  },
};
