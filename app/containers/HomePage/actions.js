import { ADD } from './constants';

export const addTodo = todo => ({
  type: ADD,
  todo,
});
