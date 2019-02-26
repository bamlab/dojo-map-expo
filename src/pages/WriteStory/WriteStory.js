// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackActions, NavigationActions, NavigationScreenProps } from 'react-navigation';
import { TextInput } from '../../components';
import I18n from '../../lib/I18n';
import theme from '../../theme';

type PropsType = {} & NavigationScreenProps;

type StateType = {
  nickname: string,
  story: string,
};

class WriteStory extends PureComponent<PropsType, StateType> {
  state = {
    nickname: '',
    story: '',
  };

  componentDidMount() {
    return this.props.navigation.setParams({
      onChangeText: this._onChangeNickname,
      onSubmit: this._submitStory,
    });
  }

  _updateNavParams = () =>
    this.props.navigation.setParams({
      onSubmit: () => this._submitStory(this.state.nickname, this.state.story),
      canSubmit: this._canSubmit(),
    });

  _canSubmit = () => {
    const { nickname, story } = this.state;
    return nickname && story && !!nickname.length && !!story.length;
  };

  _onChangeNickname = (nickname: string) => this.setState({ nickname }, this._updateNavParams);

  _onChangeStory = (story: string) => this.setState({ story }, this._updateNavParams);

  _submitStory = (nickname: string, story: string) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home',
        }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={I18n.t('WriteStory.write_story')}
          placeholderTextColor={theme.colors.lightGrey}
          onChangeText={this._onChangeStory}
          value={this.state.story}
          containerStyle={styles.storyContainer}
          multiline
          style={styles.story}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  storyContainer: {
    paddingTop: 3 * theme.margin,
    marginHorizontal: 2 * theme.margin,
    paddingBottom: 2 * theme.margin,
  },
  story: {
    color: theme.colors.blueberry,
  },
});

export default WriteStory;
