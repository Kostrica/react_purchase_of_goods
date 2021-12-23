import { combineReducers } from 'redux';
import { cardsReducer } from './reducers/cardsReducer';
import { goodMinPriceReducer } from './reducers/goodMinPriceReducer';
import { userDataReducer } from './reducers/userDataReducer';

export const rootReducer = combineReducers({
  cards: cardsReducer,
  goodMinPrice: goodMinPriceReducer,
  userData: userDataReducer,
});
