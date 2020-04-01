import { DECREMENT, INCREMENT } from '../action-types';

const initialState = {
  currentCounter: 0,
};

export const counterReducer = (state = initialState, action) => {
  const { currentCounter } = state;

  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        currentCounter: currentCounter + 1
      };
    case DECREMENT:
      return {
        ...state,
        currentCounter: currentCounter - 1
      };
    default:
      return state
  }
};