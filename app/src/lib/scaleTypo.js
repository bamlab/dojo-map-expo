// @flow

import { Dimensions } from 'react-native';

const SCALING_FACTOR = 320;
const SCREEN_WIDTH = Dimensions.get('screen').width;

export const scaleTypo = (typo: { fontSize: number, lineHeight: number }): { fontSize: number, lineHeight: number } => {
  const { fontSize, lineHeight } = typo;
  const scaleCoef = SCREEN_WIDTH / SCALING_FACTOR;
  return {
    fontSize: Math.ceil(fontSize * scaleCoef),
    lineHeight: Math.ceil(lineHeight * scaleCoef),
  };
};
