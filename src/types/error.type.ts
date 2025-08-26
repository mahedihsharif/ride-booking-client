/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IErrorData {
  success: boolean;
  errorSources?: any[];
  message: string;
  err?: any;
  stack?: any;
}
