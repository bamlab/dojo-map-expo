// @flow
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import BAMText from '@bam.tech/react-native-component-text';
import { scaleTypo } from '../../lib/scaleTypo';

type PropsType = {
  children: any,
  style?: any,
  scaled?: boolean,
};

export const getFontStyle = (
  style: ?Object,
  scaled: ?boolean
): { fontFamily: string, fontWeight: ?string, fontSize: number, lineHeight: number } => {
  let fontFamily = 'NunitoSans-Regular';
  const flattenedStyle = StyleSheet.flatten(style);
  let fontSize = flattenedStyle && flattenedStyle.fontSize ? flattenedStyle.fontSize : 12;
  let lineHeight = flattenedStyle && flattenedStyle.lineHeight ? flattenedStyle.lineHeight : 1.5 * fontSize;
  if (flattenedStyle && flattenedStyle.fontWeight) {
    fontFamily = 'NunitoSans-SemiBold';
  }
  if (flattenedStyle && flattenedStyle.fontSize) {
    fontSize = flattenedStyle.fontSize;
  }

  const typo = { fontSize, lineHeight };
  const scaledTypo = !scaled ? typo : scaleTypo(typo);

  return {
    fontFamily,
    fontWeight: undefined,
    ...scaledTypo,
  };
};

export default class Text extends PureComponent<PropsType> {
  render() {
    /* eslint-disable no-unused-vars */
    const { style, scaled, ...otherProps } = this.props;
    /* eslint-enable no-unused-vars */
    const fontStyle = getFontStyle(style, scaled);
    return <BAMText style={[style, fontStyle]} {...otherProps} allowFontScaling={false} />;
  }
}
