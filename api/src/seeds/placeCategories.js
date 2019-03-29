// @flow

import { PlaceCategory } from '../modules/PlaceCategory/entity';

const createPlaceCategories = async () => {
  const placeCategories = [
    {
      name: 'Entreprise',
    },
    {
      name: 'Restaurant',
    },
    {
      name: 'Gare',
    },
    {
      name: 'Bar',
    },
    {
      name: 'Bar',
    },
  ];

  for (const placeCategory of placeCategories) {
    if (await PlaceCategory.findOne({ name: placeCategory.name })) {
      continue;
    }

    const newPlace = new PlaceCategory(placeCategory);
    await newPlace.save();
  }
};

export default createPlaceCategories;
