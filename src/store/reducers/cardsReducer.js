import { v4 as uuidv4 } from "uuid";
import { SET_CARDS } from '../actions/actionTypes';

const initialState = {
  cards: [],
};

export const cardsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CARDS:
      return {
        ...state,
        cards: payload.map(card => ({
          ...card,
          id: uuidv4(),
        })),
      };

    default:
      return state;
  }
};
