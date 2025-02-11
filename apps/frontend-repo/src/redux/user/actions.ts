import { userActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";
import { UserState } from "./@types";

const { setUsers } = userActions;

const callSetUsers =
  (payload: UserState): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setUsers(payload));
  };

const actions = {
  callSetUsers,
};

export default actions;
