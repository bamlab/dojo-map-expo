// @flow

import { PlaceController } from './controller';

export default {
  Query: {
    allPlaces: (_: void, args: void, ctx: ContextType): Promise<PlaceType[]> =>
      PlaceController.findAll(ctx),
    searchPlaces: (_: void, args: { query: string, aroundLocation?: ?{ latitude: number, longitude: number } }, ctx: ContextType): Promise<PlaceType[]> =>
      PlaceController.search(args.query, args.aroundLocation, ctx),
  },
};
