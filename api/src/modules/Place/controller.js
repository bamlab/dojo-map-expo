// @flow

import { Place } from './entity';

export class PlaceController {
  static async findAll(ctx: ContextType): Promise<PlaceType[]> {
    return Place.find();
  }
}
