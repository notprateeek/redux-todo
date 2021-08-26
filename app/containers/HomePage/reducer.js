import produce from 'immer';
import { ADD } from './constants';

export const initialState = {
  list: [],
};

const homepageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD:
        draft.list = [...draft.list, action.todo];
        break;
      default:
        return draft;
    }
  });

export default homepageReducer;
