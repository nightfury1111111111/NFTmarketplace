import { combineReducers } from 'redux';
import nftReducer from './nfts';
import hoteCollectionsReducer from './hotCollections';
import authorListReducer from './authorList';
import walletInfo from './walletInfo';

export const rootReducer = combineReducers({
  NFT: nftReducer,
  hotCollection: hoteCollectionsReducer,
  authors: authorListReducer,
  account: walletInfo,
});

const reducers = (state, action) => rootReducer(state, action);

export default reducers;