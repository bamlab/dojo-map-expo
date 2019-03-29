// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { NavigationScreenProps, withNavigation } from 'react-navigation';
import Icon from '../Icon';
import Separator from '../Separator';
import TextInput from '../TextInput';
import BackButton from '../BackButton';
import TouchableOpacity from '../TouchableOpacity';
import theme from '../../theme';

type PropsType = {
  iconName: string,
  onChangeText: Function,
  placeholder: string,
  onSubmit?: Function,
  canSubmit?: boolean,
} & NavigationScreenProps;

type StateType = {
  inputText: string,
};

class Header extends PureComponent<PropsType, StateType> {
  state = {
    inputText: '',
  };

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.navigation.state.routeName !== prevProps.navigation.state.routeName) {
      this._onChangeText('');
    }
  }

  _onChangeText = (inputText: string) => {
    this.props.onChangeText && this.props.onChangeText(inputText);
    return this.setState({ inputText });
  };

  _onSubmit = () => {
    const { onSubmit, canSubmit } = this.props;
    return canSubmit ? onSubmit && onSubmit() : null;
  };

  render() {
    const { iconName, placeholder, onSubmit, canSubmit } = this.props;
    return (
      <View>
        <StatusBar backgroundColor={theme.colors.blueberry} />
        <View style={styles.container}>
          <View style={styles.headerTop}>
            <BackButton />
            {onSubmit && (
              <TouchableOpacity onPress={this._onSubmit} hitSlop={{ top: 15, bottom: 15, left: 10, right: 10 }}>
                <Icon
                  name="check"
                  size={16}
                  style={styles.submitIcon}
                  color={canSubmit ? theme.colors.white : theme.colors.deepGrey}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Icon name={iconName} size={20} color={theme.colors.primary} />
            <TextInput
              containerStyle={
                this.state.inputText &&
                this.state.inputText.length &&
                Platform.OS === 'ios' &&
                styles.inputWithSearchText
              }
              style={styles.textInput}
              numberOfLines={1}
              value={this.state.inputText}
              onChangeText={this._onChangeText}
              placeholder={placeholder}
              placeholderTextColor={'rgba(255, 255, 255,0.5)'}
            />
          </View>
          <Separator color={theme.colors.primary} style={styles.separator} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.margin,
    marginHorizontal: 2 * theme.margin,
    marginTop: theme.margin,
  },
  textInput: {
    ...theme.typo.title,
    marginLeft: theme.margin,
    marginRight: theme.margin,
    color: theme.colors.white,
  },
  inputWithSearchText: {
    marginTop: -theme.margin / 2,
    marginBottom: theme.margin / 2,
  },
  container: {
    backgroundColor: theme.colors.blueberry,
    paddingTop: 2 * theme.margin,
  },
  separator: {
    marginBottom: 3 * theme.margin,
    marginHorizontal: 2 * theme.margin,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitIcon: {
    padding: 2 * theme.margin,
  },
});

export default withNavigation(Header);
