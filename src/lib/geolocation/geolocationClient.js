// @flow

import NativeGeocoder from 'react-native-geocoder';
import { Platform } from 'react-native';

const API_KEY = Platform.select({
  ios: 'AIzaSyDL8m3iERfOPAtGzjds4DZuSztgyCBbz3k',
  android: 'AIzaSyB3_7SwHUxAyOGzuIZcEv22-yAakJb1j34',
});

NativeGeocoder.fallbackToGoogle(API_KEY);

export default NativeGeocoder;
