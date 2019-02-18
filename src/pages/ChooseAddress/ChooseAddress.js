// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { throttle } from 'lodash';
import { AddressLine } from './components';
import I18n from '../../lib/I18n';
import { Text } from '../../components';
import { findAddressesFromSearch } from '../../lib/geolocation';
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

  _findAddressesFromSearch = (searchText: string) => {
    this.setState({ isLoading: true }, () => {
      findAddressesFromSearch(searchText)
        .then(addressObjects => this.setState({ addressObjects }))
        .catch(console.warn)
        .finally(() => this.setState({ isLoading: false }));
    });
  };

  _throttleFindAddressesFromSearch = throttle(this._findAddressesFromSearch, 500);

  _onChangeSearchText = (searchText: string) => {
    this.setState({ searchText });
    if (searchText.length >= SEARCH_TEXT_LENGTH_THRESHOLD) {
      this._throttleFindAddressesFromSearch(searchText);
    }
  };

  _keyExtractor = (item: { address: string, location: { latitude: number, longitude: number } }): string =>
    item.address;

  _renderAddressLine = ({
    item: addressObject,
    index,
  }: {
    item: {
      address: string,
      location: { latitude: number, longitude: number },
    },
    index: number,
  }): any => <AddressLine addressObject={addressObject} style={styles.addressLine} />;

  _renderEmptyAddressesList = () =>
    this.state.searchText.length >= SEARCH_TEXT_LENGTH_THRESHOLD ? (
      <Text style={styles.noResult}>{I18n.t('ChooseAddress.no_result_found')}</Text>
    ) : null;

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
          <FlatList
            showsVerticalScrollIndicator={false}
            data={addressObjects && addressObjects.length ? addressObjects.slice(0, 4) : []}
            renderItem={this._renderAddressLine}
            keyExtractor={this._keyExtractor}
            contentContainerStyle={
              !addressObjects || !addressObjects.length ? styles.emptyContentContainer : styles.addressesListContainer
            }
            ListEmptyComponent={this._renderEmptyAddressesList}
          />
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
  emptyContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
  addressesListContainer: {
    paddingTop: 3 * theme.margin,
    marginHorizontal: 2 * theme.margin,
  },
  addressLine: {
    marginBottom: 2 * theme.margin,
  },
});

export default ChooseAddress;
