// @flow

import { Localization } from 'expo-localization';
import I18n from 'i18n-js';
import fr from './fr.json';

I18n.fallbacks = true;
I18n.defaultLocale = "fr";
I18n.translations = { fr };
I18n.locale = Localization.locale;

export default I18n;
