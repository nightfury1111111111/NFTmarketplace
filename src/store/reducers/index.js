import { combineReducers } from 'redux';
import nftReducer from './nfts';
import hoteCollectionsReducer from './hotCollections';
import authorListReducer from './authorList';
import walletInfo from './walletInfo';
import filterInfo from "./filterInfo";

export const rootReducer = combineReducers({
  NFT: nftReducer,
  hotCollection: hoteCollectionsReducer,
  authors: authorListReducer,
  account: walletInfo,
  filter:filterInfo
});

const reducers = (state, action) => rootReducer(state, action);

export default reducers;