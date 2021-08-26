import { ADD, EDIT, DELETE } from './constants';

export const addTodo = todo => ({
  type: ADD,
  todo,
});

export const editTodo = (id, value) => ({
  type: EDIT,
  id,
  value,
});

export const deleteTodo = id => ({
  type: DELETE,
  id,
});
