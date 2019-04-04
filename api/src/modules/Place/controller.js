// @flow

import { Place } from './entity';

export class PlaceController {
  static async findAll(ctx: ContextType): Promise<PlaceType[]> {
    return Place.find();
  }

  static async search(query: string, aroundLocation: ?{ latitude: number, longitude: number }, ctx: ContextType): Promise<PlaceType[]> {
    const delta = 0.1;
    const boundingBox = aroundLocation ? [
      aroundLocation.latitude - delta,
      aroundLocation.latitude + delta,
      aroundLocation.longitude - delta,
      aroundLocation.longitude + delta,
    ] : null;
    const sqlClauseForAroundLocation = boundingBox ?
      ` AND "Place".latitude > ${boundingBox[0]} AND "Place".latitude <= ${boundingBox[1]} AND "Place".longitude > ${boundingBox[2]} AND "Place".longitude <= ${boundingBox[3]}`
      : '';

    return Place.find({
      where: `"Place".searchable @@ to_tsquery('french', '${query}')${sqlClauseForAroundLocation}`,
      take: 10,
    });
  }
}
