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

class Home extends PureComponent<PropsType, StateType> {
  map: any = null;
  hasInitializedToInitialLocation: boolean = false;

  state = {
    selectedStoryObject: null,
    stories: [],
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (!this.hasInitializedToInitialLocation && this.props.isFocused) {
        const initialLocation = this.props.navigation.getParam('initialLocation');
        if (initialLocation) {
          this.map && this.map.animateToRegion(positionToRegion({ coords: initialLocation }));
          this.hasInitializedToInitialLocation = true;
          this.props.navigation.setParams({ initialLocation: null });
        } else {
          this._goToUserLocation();
        }
      }
    });

    this.unsubscribeStoriesCollectionUpdate = database.collection('stories').onSnapshot(this.onStoriesCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribeStoriesCollectionUpdate();
  }

  onStoriesCollectionUpdate = querySnapshot => {
    const stories = [];
    querySnapshot.forEach(doc => {
      const { nickname, story, location } = doc.data();
      stories.push({
        id: doc.id,
        nickname,
        story,
        location,
      });
    });
    this.setState({
      stories,
    });
  };

  _goToUserLocation = (isFromUserInteraction?: boolean): Promise<void> =>
    checkPermissionAndGetCurrentLocation(isFromUserInteraction)
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

  _onGoToMyLocationPress = () => this._goToUserLocation(true);

  _onStoryModalClose = () => this.setState({ selectedStoryObject: null });

  _onStoryMarkerPress = (selectedStoryObject: StoryObjectType) => this.setState({ selectedStoryObject });

  render() {
    return (
      <View style={styles.container}>
        <MapView
          setRef={ref => (this.map = ref)}
          style={styles.map}
          storyObjects={this.state.stories}
          onStoryMarkerPress={this._onStoryMarkerPress}
        />
        <MapButton
          style={styles.goToMyLocationButton}
          onPress={this._onGoToMyLocationPress}
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
