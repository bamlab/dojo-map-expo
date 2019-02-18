// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';

type PropsType = {
  children: any,
};

export default class TouchableOpacity extends PureComponent<PropsType> {
  render() {
    return <RNTouchableOpacity activeOpacity={0.7} {...this.props} />;
  }
}
