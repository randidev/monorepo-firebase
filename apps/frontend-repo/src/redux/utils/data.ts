import { ToastState, UtilsState } from "./@types";

export const initialToast: ToastState = {
  show: false,
  message: "",
  severity: "info",
};


export const initialState: UtilsState = {
  toast: initialToast,
}
