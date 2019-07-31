import { createSelector } from 'reselect';

const selectLoggingDomain = () => (state) => state.userReducer;

const makeSelectLoggedIn = () => createSelector(
  selectLoggingDomain(),
  (substate) => substate.loggedIn
);

export { makeSelectLoggedIn };