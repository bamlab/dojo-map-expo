// @flow

import * as Localization from 'expo-localization';
import I18n from 'i18n-js';
import fr from './fr.json';

I18n.fallbacks = true;
I18n.translations = { fr };
I18n.locale = Localization.locale;

export default I18n;
