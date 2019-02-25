// @flow

import { Permissions, Location } from 'expo';

export { positionToRegion } from './positionToRegion';

const checkLocationPermissionAndAskIfPossible = () => {
  return getLocationPermissionStatus().then(({ status }) => {
    switch (status) {
      case 'granted':
        return true;
      case 'denied':
        return askForLocationPermission();
      default:
        return false;
    }
  });
};

const askForLocationPermission = () => {
  return Permissions.getAsync(Permissions.LOCATION).then(({ status }) => status === 'granted');
};

export const getLocationPermissionStatus = () => Permissions.askAsync(Permissions.LOCATION);

const checkLocationIsAllowed = () => {
  return checkLocationPermissionAndAskIfPossible().then(allowed => {
    return allowed
      ? Location.hasServicesEnabledAsync().then(enabled => (enabled ? Promise.resolve() : Promise.reject()))
      : Promise.reject(); // eslint-disable-line prefer-promise-reject-errors
  });
};

export const checkPermissionAndGetCurrentLocation = () => {
  return checkLocationIsAllowed().then(() => getUserLocation());
};

export const getUserLocation = () =>
  /* eslint-disable promise/avoid-new */
  //$FlowFixMe
  new Promise((resolve, reject) => {
    Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
      maximumAge: 10000,
    }).then(position => resolve(position));
  });
/* eslint-enable promise/avoid-new */

export const getUserLocationCoordsIfAllowed = async (): Promise<?{ latitude: number, longitude: number }> => {
  try {
    const { status: geolocationPermissionStatus } = await getLocationPermissionStatus();
    if (geolocationPermissionStatus === 'granted') {
      const location = await getUserLocation();
      return location.coords;
    }
  } catch (error) {
    console.warn(error);
  }
  return null;
};

export const defaultRegion = {
  //France
  latitude: 47.79996609521493,
  latitudeDelta: 15.27934578877349,
  longitude: 1.957765156227698,
  longitudeDelta: 14.42444693200306,
};
