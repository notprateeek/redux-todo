import produce from 'immer';
import { ADD, EDIT, DELETE } from './constants';

export const initialState = {
  list: [],
};

const homepageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD:
        draft.list = [...draft.list, action.todo];
        break;
      case EDIT:
        const index = draft.list.findIndex(todo => todo.id == action.id);
        draft.list[index].text = action.value;
        break;
      case DELETE:
        const filtered = draft.list.filter(todo => todo.id !== action.id);
        draft.list = filtered;
        break;
      default:
        return draft;
    }
  });

export default homepageReducer;
