import { Axios, Canceler } from '../../../core/axios';
import * as actions from '../../actions';

export const fetchAuthorList = () => async (dispatch) => {

  dispatch(actions.getAuthorList.request(Canceler.cancel));

  try {
    const { data } = await Axios.get('/mock_data/author_list.json', {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getAuthorList.success(data));
  } catch (err) {
    dispatch(actions.getAuthorList.failure(err));
  }
};

export const fetchAuthorRanking = () => async (dispatch) => {

  dispatch(actions.getAuthorRanking.request(Canceler.cancel));

  try {
    const { data } = await Axios.get('/mock_data/author_ranks.json', {
      cancelToken: Canceler.token,
      params: {}
    });

    dispatch(actions.getAuthorRanking.success(data));
  } catch (err) {
    dispatch(actions.getAuthorRanking.failure(err));
  }
};
