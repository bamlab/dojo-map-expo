// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View, InteractionManager } from 'react-native';
import { NavigationScreenProps, withNavigationFocus } from 'react-navigation';
import { MapButton, MapView, StoryModal } from './components';
import theme from '../../theme';
import database from '../../lib/database';
import I18n from '../../lib/I18n';
import { checkPermissionAndGetCurrentLocation, positionToRegion, defaultRegion } from '../../lib/geolocation';

type PropsType = {
  isFocused: boolean,
} & NavigationScreenProps;

type StateType = {
  selectedStoryObject: ?StoryObjectType,
  stories: StoryObjectType[],
};

const stories = [
  {
    id: '1',
    nickname: 'Gaspard',
    story: 'Hey !',
    location: {
      latitude: 48.866667,
      longitude: 2.333333,
    },
  },
  {
    id: '2',
    nickname: 'Maxime',
    story: 'Hello !',
    location: {
      latitude: 48.8827042,
      longitude: 2.3224131,
    },
  },
];

class Home extends PureComponent<PropsType, StateType> {
  map: any = null;
  hasInitializedToInitialLocation: boolean = false;
  unsubscribeStoriesCollectionUpdate: any;

  state = {
    selectedStoryObject: null,
    stories: [],
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (!this.hasInitializedToInitialLocation && this.props.isFocused) {
        this._goToUserLocation();
      }
    });
    this.unsubscribeStoriesCollectionUpdate = database.collection('stories').onSnapshot(this.onStoriesCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribeStoriesCollectionUpdate();
  }

  onStoriesCollectionUpdate = querySnapshot => {
    querySnapshot.forEach(doc => {});
  };

  _goToUserLocation = (): Promise<void> =>
    checkPermissionAndGetCurrentLocation()
      .then(position => positionToRegion(position))
      .catch(e => {
        console.warn(e);
        return defaultRegion;
      })
      .then(initialRegion => {
        this.map && this.map.animateToRegion(initialRegion);
        if (!this.hasInitializedToInitialLocation) {
          this.hasInitializedToInitialLocation = true;
        }
        return new Promise(resolve => setTimeout(resolve, 2000)); // eslint-disable-line promise/avoid-new
      });

  _onAddStoryButtonPress = () =>
    this.props.navigation.navigate('ChooseAddress', {
      placeholder: I18n.t('ChooseAddress.AddressInput.placeholder'),
      iconName: 'search',
    });

  _onStoryModalClose = () => this.setState({ selectedStoryObject: null });

  _onStoryMarkerPress = (selectedStoryObject: StoryObjectType) => this.setState({ selectedStoryObject });

  render() {
    return (
      <View style={styles.container}>
        <MapView
          setRef={ref => (this.map = ref)}
          style={styles.map}
          storyObjects={stories}
          onStoryMarkerPress={this._onStoryMarkerPress}
        />
        <MapButton
          style={styles.goToMyLocationButton}
          onPress={this._goToUserLocation}
          iconColor={theme.colors.lightGrey}
          iconName="my-location"
        />
        <MapButton
          style={styles.addStoryButton}
          onPress={this._onAddStoryButtonPress}
          iconColor={theme.colors.white}
          iconName="plus"
        />
        {!!this.state.selectedStoryObject && (
          <StoryModal
            visible={!!this.state.selectedStoryObject}
            storyObject={this.state.selectedStoryObject}
            onClose={this._onStoryModalClose}
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
  map: {
    flex: 1,
  },
  goToMyLocationButton: {
    position: 'absolute',
    bottom: theme.margin * 2,
    right: 0,
    marginRight: theme.margin * 2,
    backgroundColor: theme.colors.white,
  },
  addStoryButton: {
    position: 'absolute',
    bottom: theme.margin * 2,
    left: 0,
    marginLeft: theme.margin * 2,
    backgroundColor: theme.colors.blueberry,
  },
});

export default withNavigationFocus(Home);
