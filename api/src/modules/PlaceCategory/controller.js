// @flow

import { PlaceCategory } from './entity';
import { PlaceCategoryRepository } from './repository';

export class PlaceCategoryController {
  static async findAll(ctx: ContextType): Promise<PlaceCategoryType[]> {
    return PlaceCategory.find();
  }

  static async findByPlace(place: PlaceType, ctx: ContextType): Promise<?PlaceCategoryType> {
    if (!place.categoryId) return null;
    return PlaceCategoryRepository.findById(place.categoryId, ctx);
  }
}
