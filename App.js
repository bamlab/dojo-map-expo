/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component } from 'react';
import { Font } from 'expo';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import RootNavigation from './src/navigation/index';
import theme from './src/theme/index';

export default class App extends Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    // Load fonts
    /* eslint-disable promise/always-return */
    Font.loadAsync({
      'NunitoSans-Bold': require('./assets/fonts/NunitoSans-Bold.ttf'),
      'NunitoSans-Regular': require('./assets/fonts/NunitoSans-Regular.ttf'),
      'NunitoSans-SemiBold': require('./assets/fonts/NunitoSans-SemiBold.ttf'),
      icomoon: require('./assets/icons/icomoon.ttf'),
    }).then(() => {
      if (!this.state.isReady) {
        this.setState({
          isReady: true,
        });
      }
    });
    /* eslint-enable promise/always-return */
  }
  render() {
    if (!this.state.isReady) return null;
    return (
      <PaperProvider theme={paperTheme}>
        <RootNavigation />
      </PaperProvider>
    );
  }
}

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.text,
  },
  fonts: {
    regular: 'NunitoSans-Regular',
    light: 'NunitoSans-Regular',
    thin: 'NunitoSans-Regular',
    medium: 'NunitoSans-SemiBold',
  },
};
