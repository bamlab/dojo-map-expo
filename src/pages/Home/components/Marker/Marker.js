// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Text } from '../../../../components';
import theme from '../../../../theme';
const { Marker: RNMarker } = MapView;

type PropsType = {
  storyObject: StoryObjectType,
  onPress: Function,
  showNickname?: ?boolean,
};

export default class Marker extends PureComponent<PropsType> {
  _onPress = () => this.props.onPress(this.props.storyObject);

  render() {
    const { storyObject, showNickname } = this.props;
    return (
      <RNMarker
        key={storyObject.id}
        coordinate={{ longitude: storyObject.location.longitude, latitude: storyObject.location.latitude }}
        onPress={this._onPress}
      >
        <View style={styles.container}>
          <Image style={styles.emptyMarker} source={theme.images.mapMarkerEmpty} resizeMode="contain" />
          {showNickname && <Text style={styles.nickname}>{storyObject.nickname}</Text>}
        </View>
      </RNMarker>
    );
  }
}

const styles = StyleSheet.create({
  emptyMarker: {
    width: 33,
    height: 33,
  },
  nickname: {
    fontWeight: '600',
    color: theme.colors.primary,
  },
  container: {
    alignItems: 'center',
  },
});
