   import { Dispatch } from 'redux';
   import { fetchUsers } from '../Api';

   export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
   export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
   export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

   interface FetchUsersRequestAction {
     type: typeof FETCH_USERS_REQUEST;
   }

   interface FetchUsersSuccessAction {
     type: typeof FETCH_USERS_SUCCESS;
     payload: any[];
   }

   interface FetchUsersFailureAction {
     type: typeof FETCH_USERS_FAILURE;
     payload: string;
   }

   export type UserActionTypes =
     | FetchUsersRequestAction
     | FetchUsersSuccessAction
     | FetchUsersFailureAction;

   export const fetchUsersRequest = (): FetchUsersRequestAction => ({
     type: FETCH_USERS_REQUEST,
   });

   export const fetchUsersSuccess = (users: any[]): FetchUsersSuccessAction => ({
     type: FETCH_USERS_SUCCESS,
     payload: users,
   });

   export const fetchUsersFailure = (error: string): FetchUsersFailureAction => ({
     type: FETCH_USERS_FAILURE,
     payload: error,
   });

   export const fetchUsersData = (page: number, results: number) => {
     return async (dispatch: Dispatch<UserActionTypes>) => {
       dispatch(fetchUsersRequest());
       try {
         const users = await fetchUsers(page, results);
         console.log("users: ", users);
         dispatch(fetchUsersSuccess(users));
       } catch (error: any) {
         dispatch(fetchUsersFailure(error.message));
       }
     };
   };