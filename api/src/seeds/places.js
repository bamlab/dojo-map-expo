// @flow

import places from './data/places.json';
import { Place } from '../modules/Place/entity';
import { PlaceCategory } from '../modules/PlaceCategory/entity';

const createPlaces = async () => {
  for (const place of places) {
    if (await Place.findOne({ name: place.name })) {
      continue;
    }

    const placeCategory = place.placeCategoryName ? await PlaceCategory.findOne({ name: place.placeCategoryName }) : null;
    const newPlace = new Place({ ...place, category: placeCategory });
    await newPlace.save();
  }
};

export default createPlaces;
