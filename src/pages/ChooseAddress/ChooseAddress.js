// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { throttle } from 'lodash';
import { AddressLine } from './components';
import I18n from '../../lib/I18n';
import { Text } from '../../components';
import theme from '../../theme';

type PropsType = {} & NavigationScreenProps;

type StateType = {
  addressObjects: {
    address: string,
    location: { latitude: number, longitude: number },
  }[],
  isLoading: boolean,
  searchText: string,
};

const SEARCH_TEXT_LENGTH_THRESHOLD = 3;

const addressObject = {
  address: 'Paris',
  location: {
    latitude: 0.1,
    longitude: 0.2,
  },
};

class ChooseAddress extends PureComponent<PropsType, StateType> {
  state = {
    addressObjects: [],
    isLoading: false,
    searchText: '',
  };

  componentDidMount() {
    return this.props.navigation.setParams({
      onChangeText: this._onChangeSearchText,
    });
  }

  _findAddressesFromSearch = (searchText: string) => null;

  _throttleFindAddressesFromSearch = throttle(this._findAddressesFromSearch, 500);

  _onChangeSearchText = (searchText: string) => {
    this.setState({ searchText });
    if (searchText.length >= SEARCH_TEXT_LENGTH_THRESHOLD) {
      this._throttleFindAddressesFromSearch(searchText);
    }
  };

  render() {
    const { isLoading, addressObjects, searchText } = this.state;
    const shouldShowLoader = isLoading && (!addressObjects || !addressObjects.length);
    return (
      <View style={styles.container}>
        {!searchText || searchText.length < SEARCH_TEXT_LENGTH_THRESHOLD ? (
          <View style={styles.noSearchTextContainer}>
            <Text style={styles.noSearchText}>{I18n.t('ChooseAddress.no_search_text')}</Text>
          </View>
        ) : shouldShowLoader ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <AddressLine addressObject={addressObject} style={styles.addressLine} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noSearchTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4 * theme.margin,
  },
  noSearchText: {
    ...theme.typo.title,
    color: theme.colors.lightGrey,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResult: {
    ...theme.typo.title,
    color: theme.colors.deepGrey,
  },
});

export default ChooseAddress;
