// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

type PropsType = {
  style?: any,
  color: string,
};

export default class TouchableOpacity extends PureComponent<PropsType> {
  render() {
    return <View style={[styles.separator, this.props.style, { backgroundColor: this.props.color }]} />;
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
  },
});
