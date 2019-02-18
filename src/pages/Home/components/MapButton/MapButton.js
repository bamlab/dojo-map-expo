// @flow

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, Icon } from '../../../../components';

type PropsType = {
  style?: any,
  onPress: Function,
  iconColor: string,
  iconName: string,
};

class MapButton extends PureComponent<PropsType> {
  render() {
    const { style, onPress, iconColor, iconName } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
        <Icon name={iconName} color={iconColor} size={20} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.6,
  },
});

export default MapButton;
