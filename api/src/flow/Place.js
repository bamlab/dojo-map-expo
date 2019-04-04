//@flow

declare type PlaceType = {
  id: string,
  name: string,
  address: string,
  latitude: number,
  longitude: number,
  category: PlaceCategoryType,
};

declare type PlaceInputType = {
  name: string,
  address: string,
  latitude: number,
  longitude: number,
  category: PlaceCategoryType,
};
