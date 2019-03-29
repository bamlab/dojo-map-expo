// @flow

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps, withNavigation } from 'react-navigation';
import theme from '../../../../theme';
import { TouchableOpacity, Text } from '../../../../components';
import I18n from '../../../../lib/I18n';

type PropsType = {
  addressObject: {
    address: string,
    location: { latitude: number, longitude: number },
  },
  style?: any,
} & NavigationScreenProps;

class AddressLine extends PureComponent<PropsType> {
  _onPress = () =>
    this.props.navigation.navigate('WriteStory', {
      location: this.props.addressObject.location,
      placeholder: I18n.t('WriteStory.Nickname.placeholder'),
      iconName: 'user1',
    });

  render() {
    return (
      <TouchableOpacity onPress={this._onPress} style={this.props.style}>
        <Text numberOfLines={1} style={styles.address}>
          {this.props.addressObject.address}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  address: {
    ...theme.typo.title,
    color: theme.colors.blueberry,
  },
});

export default withNavigation(AddressLine);
