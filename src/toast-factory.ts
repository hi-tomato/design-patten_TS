import { ErrorToast, InfoToast, SuccessToast, WarningToast } from "./toast";

type ToastType = 'success' | 'error' | 'warning' | 'info';

export class ToastFactory {
  static createToast(type: ToastType) {
    switch (type) {
      case "success": 
      return new SuccessToast();

      case "error": 
      return new ErrorToast();

      case "warning": 
      return new WarningToast();
      
      case "info": 
      return new InfoToast();
    }
  }
}