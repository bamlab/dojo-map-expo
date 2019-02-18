// @flow

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import * as Pages from '../pages';
import { Header } from '../components';

const RootNavigator = createStackNavigator(
  {
    Home: {
      screen: Pages.Home,
    },
    ChooseAddress: {
      screen: Pages.ChooseAddress,
      navigationOptions: ({ navigation }: any) => ({
        header: () => (
          <Header
            placeholder={navigation.getParam('placeholder')}
            iconName={navigation.getParam('iconName')}
            onChangeText={navigation.getParam('onChangeText')}
          />
        ),
      }),
    },
    WriteStory: {
      screen: Pages.WriteStory,
      navigationOptions: ({ navigation }: any) => ({
        header: () => (
          <Header
            placeholder={navigation.getParam('placeholder')}
            iconName={navigation.getParam('iconName')}
            onChangeText={navigation.getParam('onChangeText')}
            onSubmit={navigation.getParam('onSubmit')}
            canSubmit={navigation.getParam('canSubmit')}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      header: null,
    },
  }
);

export default class RootNavigation extends Component {
  render() {
    return <RootNavigator />;
  }
}
