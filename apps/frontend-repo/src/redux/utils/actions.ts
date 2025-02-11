import { utilsActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";
import { ToastState } from "./@types";

const { 
  setToast,
 } = utilsActions;


const callSetToast =
  (payload: ToastState): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setToast(payload));
  };

  
const actions = {
  callSetToast,
};

export default actions;
