import { SET_CARDS } from './actionTypes';

import { getCards } from '../../utils/utils';

export const setCards = () => (dispatch) => {
  getCards()
    .then(({ data }) => {
      dispatch({
        type: SET_CARDS,
        payload: data,
      });
    });
};
