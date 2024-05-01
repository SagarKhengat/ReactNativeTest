   import { createStore, applyMiddleware } from 'redux';
   import thunk, { ThunkMiddleware } from 'redux-thunk';
   import userReducer from './user/UserReducers';
   import { UserActionTypes } from './user/UserActions';

   export type RootState = ReturnType<typeof userReducer>;

   const store = createStore(
     userReducer,
     applyMiddleware(thunk as ThunkMiddleware<RootState, UserActionTypes>)
   );

   export default store;