import { createSelector } from 'reselect';
import { initialState } from './reducer';

const homepageDomain = state => state.todo || initialState;

const makeSelectList = () =>
  createSelector(
    homepageDomain,
    substate => substate.list,
  );

export { makeSelectList };
