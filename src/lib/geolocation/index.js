// @flow

import { Platform } from 'react-native';
import { Permissions } from 'expo';
import Geolocation from 'react-native-geolocation-service';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

export { findAddressesFromSearch } from './geocoder';
export { positionToRegion } from './positionToRegion';

const checkLocationPermissionAndAskIfPossible = (isFromUserInteraction?: boolean) => {
  return getLocationPermissionStatus().then(({status}) => {
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

const askForLocationPermissionAgain = () => {
  if (Platform.OS === 'android') {
    return askForLocationPermission();
  }
  return false;
};

const askForLocationPermission = () => {
  return Permissions.getAsync(Permissions.LOCATION).then(({ status }) => status === 'granted');
};

export const getLocationPermissionStatus = () => Permissions.askAsync(Permissions.LOCATION);

const checkLocationIsAllowed = (isFromUserInteraction?: boolean) => {
  return checkLocationPermissionAndAskIfPossible(isFromUserInteraction).then(allowed => {
    return allowed ? checkLocationServicesEnabled() : Promise.reject(); // eslint-disable-line prefer-promise-reject-errors
  });
};

const checkLocationServicesEnabled = () => {
  if (Platform.OS !== 'android') {
    return;
  }
  return LocationServicesDialogBox.checkLocationServicesIsEnabled({ showDialog: false, enableHighAccuracy: false });
};

export const checkPermissionAndGetCurrentLocation = (isFromUserInteraction?: boolean) => {
  return checkLocationIsAllowed(isFromUserInteraction).then(() => getUserLocation());
};

export const getUserLocation = () =>
  /* eslint-disable promise/avoid-new */
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(position => resolve(position), e => reject(e), {
      timeout: 8000,
      maximumAge: 10000,
    });
  });
/* eslint-enable promise/avoid-new */

export const getUserLocationCoordsIfAllowed = async (): Promise<?{ latitude: number, longitude: number }> => {
  try {
    const { status : geolocationPermissionStatus } = await getLocationPermissionStatus();
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
