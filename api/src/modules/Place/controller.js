// @flow

import { Like } from 'typeorm';
import { Place } from './entity';

export class PlaceController {
  static async findAll(ctx: ContextType): Promise<PlaceType[]> {
    return Place.find();
  }

  static async search(query: string, ctx: ContextType): Promise<PlaceType[]> {
    return Place.find({
      where: { name: Like(`%${query}%`) },
      take: 10,
    });
  }
}
