import { SET_GOOD_MIN_PRICE } from '../actions/actionTypes';

const initialState = {
  goodMinPrice: {
    name: '',
    category: '',
    price: 0,
    id: '',
  },
};

export const goodMinPriceReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_GOOD_MIN_PRICE:
      return {
        ...state,
        goodMinPrice: payload.sort((elemA, elemB) => elemA.price - elemB.price)[0],
      };

    default:
      return state;
  }
};
