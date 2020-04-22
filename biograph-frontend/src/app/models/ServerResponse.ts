export interface ServerResponse {
  status: ResponseStatus;
  data: string;
  authToken: string;
}

export function getErrorMessage(response: ServerResponse) {
  if (response.status === ResponseStatus.ERROR) {
    return JSON.parse(response.data).message;
  }
  return response.data;
}

export enum ResponseStatus {
  OK = 'OK',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  REDIRECT = 'REDIRECT',
}
