// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon, Separator } from '../../../../../../components';
import theme from '../../../../../../theme';

type PropsType = {
  nickname: string,
  style?: any,
};

export default class Nickname extends PureComponent<PropsType> {
  render() {
    return (
      <View style={this.props.style}>
        <View style={styles.nicknameLine}>
          <Icon name="user1" size={20} color={theme.colors.primary} />
          <Text style={styles.nickname} numberOfLines={1}>
            {this.props.nickname}
          </Text>
        </View>
        <Separator color={theme.colors.primary} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nicknameLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.margin,
  },
  nickname: {
    ...theme.typo.title,
    marginLeft: 2 * theme.margin,
    marginRight: theme.margin,
    color: theme.colors.white,
  },
});
