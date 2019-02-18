// @flow

import React, { PureComponent } from 'react';
import SnackBar from '@bam.tech/react-native-snackbar-dialog';
import { StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../../theme';
import Text from '../Text';

type PropsType = {
  message: string,
  error: boolean,
  colors?: { backgroundColor?: string, textColor?: string },
  onPress?: Function,
};

class Toast extends PureComponent<PropsType> {
  _dismiss = () => SnackBar.dismiss();

  _onPress = () => {
    this.props.onPress && this.props.onPress();
    this._dismiss();
  };

  render() {
    const colors = this.props.error ? theme.errorToast : theme.messageToast;
    return (
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: (this.props.colors && this.props.colors.backgroundColor) || colors.background },
        ]}
        activeOpacity={1}
        onPress={this._onPress}
      >
        <Text style={{ color: (this.props.colors && this.props.colors.textColor) || colors.text }}>
          {this.props.message}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default Toast;
