// @flow

import { Place } from './entity';

export class PlaceController {
  static async findAll(ctx: ContextType): Promise<PlaceType[]> {
    return Place.find();
  }

  static async search(query: string, ctx: ContextType): Promise<PlaceType[]> {
    return Place.find({
      where: `Place.name ILIKE ('%${query}%')`,
      take: 10,
    });
  }
}
