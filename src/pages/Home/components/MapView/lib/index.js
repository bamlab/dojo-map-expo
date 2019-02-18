// @flow

export const ZOOM_MAX = 20;
export const ZOOM_THRESHOLD_TO_NICKNAME = 17;
export const MIN_ZOOM_TO_ADD_ON_CLUSTER_PRESS = 1;

export const convertToGeoJSON = (
  storyObjects: StoryObjectType[] = []
): {
  properties: {
    id: string,
    nickname: string,
    story: string,
  },
  geometry: {
    coordinates: number[],
  },
}[] =>
  storyObjects.map(storyObject => ({
    properties: {
      id: storyObject.id,
      nickname: storyObject.nickname,
      story: storyObject.story,
    },
    geometry: {
      type: 'Point',
      coordinates: [storyObject.location.longitude, storyObject.location.latitude],
    },
  }));

export const BoundaryBox = (region: {
  longitude: number,
  latitude: number,
  longitudeDelta: number,
  latitudeDelta: number,
}): number[] => [
  region.longitude - region.longitudeDelta / 2,
  region.latitude - region.latitudeDelta / 2,
  region.longitude + region.longitudeDelta / 2,
  region.latitude + region.latitudeDelta / 2,
];

const _latRad = lat => {
  const sin = Math.sin((lat * Math.PI) / 180);
  const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
  return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
};

const _zoom = fraction => {
  return Math.floor(Math.log(1 / fraction) / Math.LN2);
};

export const zoomLevel = (region: number[]): number => {
  const latFraction = (_latRad(region[3]) - _latRad(region[1])) / Math.PI;
  const lngDiff = region[2] - region[0];
  const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;
  const latZoom = _zoom(latFraction);
  const lngZoom = _zoom(lngFraction);
  return Math.min(latZoom, lngZoom, ZOOM_MAX);
};

export const convertToStoryObject = ({ properties: { id, nickname, story }, geometry: { coordinates } }: any) => ({
  id,
  nickname,
  story,
  location: {
    longitude: coordinates[0],
    latitude: coordinates[1],
  },
});

export const getZoomFromRegion = (region): number => Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);

export const deltaCoordFromZoom = (zoom: number) => 360 * Math.exp(-zoom * Math.LN2);
