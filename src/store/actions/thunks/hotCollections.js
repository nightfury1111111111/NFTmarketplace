import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';

export const fetchHotCollections = () => async (dispatch) => {
  dispatch(actions.getHotCollections.request(Canceler.cancel));

  try {
    const { data } = await Axios.get('/mock_data/hot_collections.json', {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getHotCollections.success(data));
  } catch (err) {
    dispatch(actions.getHotCollections.failure(err));
  }
};
