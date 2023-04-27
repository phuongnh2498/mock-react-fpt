import { AxiosResponse } from "axios";

export const errorHandler = (response: AxiosResponse<any, any>): string => {
  if (response.data.status_code > 300) {
    return response.data.status_message;
  }
  if (response.data.errors) {
    return response.data.errors.map((err: any) => err.error_message).join("\n");
  }
  return "";
};
