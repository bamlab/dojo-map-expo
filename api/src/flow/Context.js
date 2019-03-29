// @flow
import DataLoader from 'dataloader';

declare type ContextType = {
  dataLoaders: DataLoadersType,
};

declare type DataLoadersType = {
  placeCategory: {
    byIds: DataLoader,
  },
};
