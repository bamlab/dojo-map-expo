// @flow

import { merge } from 'lodash';

import place from '../modules/Place/resolver';
import placeCategory from '../modules/PlaceCategory/resolver';

export default merge(place, placeCategory);
