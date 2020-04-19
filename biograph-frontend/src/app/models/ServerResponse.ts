export interface ServerResponse {
  status: ResponseStatus;
  data: string;
}

export enum ResponseStatus {
  OK = 'OK',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  REDIRECT = 'REDIRECT',
}
