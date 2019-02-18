// @flow

import mapMarkerEmpty from './images/mapMarkerEmpty/mapMarkerEmpty.png';

const colors = {
  darkGrey: '#333333',
  deepGrey: '#6B6C6D',
  lightGrey: '#B7B7B7',
  veryLightGrey: '#E5E5E5',
  lightOrange: '#FCEBED',
  primary: '#F0245A',
  white: '#ffffff',
  editBlue: '#246c9d',
  text: '#3B3176',
  blueberry: '#3b3176',
};

export default {
  colors,
  margin: 8,
  typo: {
    title: {
      fontSize: 18,
      lineHeight: 27,
    },
    body: {
      fontSize: 14,
      lineHeight: 21,
    },
  },
  errorToast: {
    text: colors.darkGrey,
    background: colors.lightOrange,
  },
  messageToast: {
    text: colors.veryLightGrey,
    background: colors.editBlue,
  },
  images: {
    mapMarkerEmpty,
  },
};
