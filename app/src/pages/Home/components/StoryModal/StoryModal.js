// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import theme from '../../../../theme';
import { TouchableOpacity, Icon, Text } from '../../../../components';
import { Nickname } from './components';

type PropsType = {
  onClose: Function,
  visible: boolean,
  storyObject: StoryObjectType,
  style?: any,
};

export default class StoryModal extends PureComponent<PropsType> {
  render() {
    const { onClose, visible, style, storyObject } = this.props;
    return (
      <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>
        <View style={[styles.container, style]}>
          <Nickname nickname={storyObject.nickname} style={styles.nickname} />
          <ScrollView style={styles.storyContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.story}>{storyObject.story}</Text>
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="cross" color={theme.colors.white} size={12} />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const MARGIN_HORIZONTAL = 3 * theme.margin;
const MARGIN_VERTICAL = 6 * theme.margin;
const BORDER_RADIUS = 5;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? MARGIN_VERTICAL : MARGIN_VERTICAL - StatusBar.currentHeight / 2,
    left: MARGIN_HORIZONTAL,
    height: Dimensions.get('screen').height - 2 * MARGIN_VERTICAL,
    width: Dimensions.get('screen').width - 2 * MARGIN_HORIZONTAL,
    borderRadius: BORDER_RADIUS,
    backgroundColor: theme.colors.white,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: theme.colors.darkGrey,
    opacity: 0.4,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
    padding: 2 * theme.margin,
  },
  nickname: {
    paddingTop: 4 * theme.margin,
    paddingBottom: 2 * theme.margin,
    paddingHorizontal: 2 * theme.margin,
    backgroundColor: theme.colors.blueberry,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
  },
  storyContainer: {
    flex: 1,
    overflow: 'hidden',
    padding: 2 * theme.margin,
  },
  story: {
    ...theme.typo.body,
    color: theme.colors.deepGrey,
    paddingBottom: 3 * theme.margin,
  },
});
