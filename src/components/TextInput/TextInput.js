// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import BAMTextInput from '@bam.tech/react-native-component-text-input';
import { TextInput as RNPTextInput } from 'react-native-paper';

export default class TextInput extends PureComponent<$FlowFixMe> {
  _root: any;
  _setRef = c => {
    this._root = c;
  };
  setNativeProps(...args: any) {
    return this._root.setNativeProps(...args);
  }
  isFocused(...args: any) {
    return this._root.isFocused(...args);
  }
  clear(...args: any) {
    return this._root.clear(...args);
  }
  focus(...args: any) {
    return this._root.focus(...args);
  }
  blur(...args: any) {
    return this._root.blur(...args);
  }

  render() {
    const { style, small, material, ...rest } = this.props;
    return (
      <BAMTextInput
        ref={this._setRef}
        TextInputComponent={material ? RNPTextInput : RNTextInput}
        style={[styles.input, small && styles.smallInput, style]}
        {...rest}
        error={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
  },
  smallInput: {
    fontSize: 14,
  },
});
