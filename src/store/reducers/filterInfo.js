import { getType } from "typesafe-actions";
import * as actions from "../actions";
import {
  initEntityState,
  entityLoadingStarted,
  entityLoadingSucceeded,
  entityLoadingFailed,
} from "../utils";

export const defaultState = {
  currentFilter: initEntityState(null),
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    case getType(actions.setFilterInfo.request):
      return {
        ...state,
        currentFilter: entityLoadingStarted(
          state.currentFilter,
          action.payload
        ),
      };
    case getType(actions.setFilterInfo.success):
      //append existing data with new data
      // let payload = state.currentFilter.data
      //   ? [...state.currentFilter.data, ...action.payload]
      //   : action.payload;
      return {
        ...state,
        currentFilter: entityLoadingSucceeded(
          state.currentFilter,
          action.payload
        ),
      };
    case getType(actions.setFilterInfo.failure):
      return {
        ...state,
        currentFilter: entityLoadingFailed(state.currentFilter),
      };

    case getType(actions.clearFilter):
      return { ...state, currentFilter: initEntityState(null) };

    default:
      return state;
  }
};

export default states;
