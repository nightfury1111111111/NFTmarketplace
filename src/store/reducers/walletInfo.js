import { getType } from "typesafe-actions";
import * as actions from "../actions";
import {
  initEntityState,
  entityLoadingStarted,
  entityLoadingSucceeded,
  entityLoadingFailed,
} from "../utils";

export const defaultState = {
  currentAccount: initEntityState(null),
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    case getType(actions.getWalletInfo.request):
      return {
        ...state,
        currentAccount: entityLoadingStarted(
          state.currentAccount,
          action.payload
        ),
      };
    case getType(actions.getWalletInfo.success):
      //append existing data with new data
      return {
        ...state,
        currentAccount: entityLoadingSucceeded(state.currentAccount, action.payload),
      };
    case getType(actions.getWalletInfo.failure):
      return {
        ...state,
        currentAccount: entityLoadingFailed(state.currentAccount),
      };

    case getType(actions.clearAccount):
      return { ...state, currentAccount: initEntityState(null) };

    default:
      return state;
  }
};

export default states;
