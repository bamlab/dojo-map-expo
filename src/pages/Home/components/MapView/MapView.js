// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { throttle, get } from 'lodash';
import superCluster from 'supercluster';
import RNMapView from 'react-native-maps';
import {
  convertToGeoJSON,
  BoundaryBox,
  zoomLevel,
  convertToStoryObject,
  getZoomFromRegion,
  ZOOM_THRESHOLD_TO_NICKNAME,
  MIN_ZOOM_TO_ADD_ON_CLUSTER_PRESS,
  ZOOM_MAX,
  deltaCoordFromZoom,
} from './lib';
import Cluster from '../Cluster';
import Marker from '../Marker';
import { googleMapsCustomMapStyle } from '../../../../config';

type PropsType = {
  children: any,
  style?: any,
  storyObjects: StoryObjectType[],
  setRef: Function,
  onStoryMarkerPress: Function,
  isFocused: boolean,
};

type StateType = {
  clusters: Array<any>,
  region: any,
};

const NODE_SIZE = 128;
const RADIUS = 60;

class MapView extends PureComponent<PropsType, StateType> {
  superCluster: any;
  map: any;

  state = {
    clusters: [],
    region: null,
    isMapReady: false,
  };

  componentDidUpdate(prevProps: any) {
    if (this.props.storyObjects !== prevProps.storyObjects) {
      this._createClustersThrottle();
    }
  }

  _setRef = ref => {
    this.map = ref;
    this.props.setRef(ref);
  };

  _createClusters = () => {
    this.superCluster = superCluster({
      radius: RADIUS,
      maxZoom: ZOOM_MAX,
      nodeSize: NODE_SIZE,
    });
    this.superCluster.load(convertToGeoJSON(this.props.storyObjects));
    this._calculateClusters();
  };

  _createClustersThrottle = throttle(this._createClusters, 500);

  _calculateClusters = () => {
    if (this.superCluster && this.state.region) {
      const bbox = BoundaryBox(this.state.region);
      const zoom = zoomLevel(bbox);
      const clusters = this.superCluster.getClusters(bbox, zoom);
      this.setState({ clusters });
    }
  };

  _calculateClustersThrottle = throttle(this._calculateClusters, 500);

  _renderCluster = cluster => {
    const clusterId = cluster.properties.cluster_id;
    return <Cluster onPress={() => this._onClusterPress(cluster)} key={clusterId} id={clusterId} cluster={cluster} />;
  };

  _renderMarker = cluster => {
    if (cluster.properties.cluster) return this._renderCluster(cluster);
    const storyObject = convertToStoryObject(cluster);
    const showNickname =
      Platform.OS === 'ios' && this.state.region && getZoomFromRegion(this.state.region) >= ZOOM_THRESHOLD_TO_NICKNAME;
    return this.state.isMapReady ? (
      <Marker
        key={storyObject.id}
        storyObject={storyObject}
        onPress={this.props.onStoryMarkerPress}
        showNickname={showNickname}
      />
    ) : null;
  };

  _onRegionChangeComplete = region => {
    this.setState({ region }, this.superCluster ? this._calculateClustersThrottle : this._createClustersThrottle);
  };

  _onClusterPress = cluster => {
    const coordinates = get(cluster, 'geometry.coordinates', null);
    if (!coordinates || coordinates.length !== 2) {
      return;
    }

    if (!this.state.region) {
      return;
    }
    const currentZoom = getZoomFromRegion(this.state.region);

    const longitude = coordinates[0];
    const latitude = coordinates[1];
    const zoomToAdd = Math.floor((MIN_ZOOM_TO_ADD_ON_CLUSTER_PRESS * ZOOM_MAX) / currentZoom);
    const deltaCoords = deltaCoordFromZoom(Math.min(ZOOM_MAX, currentZoom + zoomToAdd));
    this.map &&
      this.map.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: deltaCoords,
        longitudeDelta: deltaCoords,
      });
  };

  _onRegionChangeCompleteThrottle = throttle(this._onRegionChangeComplete, 750);

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  };

  render() {
    const { style, isFocused, ...rest } = this.props;
    return (
      <RNMapView
        {...rest}
        ref={this._setRef}
        style={[styles.container, style]}
        showsUserLocation={isFocused}
        onRegionChangeComplete={this._onRegionChangeCompleteThrottle}
        customMapStyle={googleMapsCustomMapStyle}
        onLayout={this.onMapLayout}
      >
        {this.state.clusters.map(cluster => this._renderMarker(cluster))}
      </RNMapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default withNavigationFocus(MapView);
