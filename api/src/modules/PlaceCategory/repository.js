// @flow

import DataLoader from 'dataloader';
import { PlaceCategory } from './entity';

export class PlaceCategoryRepository {
  static getDataLoaders() {
    const byIds = new DataLoader(ids => PlaceCategory.findByIds(ids));
    return { byIds };
  }

  static async findById(placeCategoryId: string, ctx: ContextType): Promise<PlaceCategoryType> {
    return await ctx.dataLoaders.placeCategory.byIds.load(placeCategoryId);
  }
}
