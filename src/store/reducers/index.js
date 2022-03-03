import { combineReducers } from 'redux';
import nftReducer from './nfts';
import hoteCollectionsReducer from './hotCollections';
import authorListReducer from './authorList';

export const rootReducer = combineReducers({
  NFT: nftReducer,
  hotCollection: hoteCollectionsReducer,
  authors: authorListReducer
});

const reducers = (state, action) => rootReducer(state, action);

export default reducers;