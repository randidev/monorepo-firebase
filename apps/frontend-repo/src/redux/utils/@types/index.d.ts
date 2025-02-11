export interface ToastState {
  show: boolean;
  message: string;
  severity?: "success" | "info" | "warning" | "error";
}

export interface UtilsState {
  toast: ToastState;
  
}

