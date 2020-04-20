export interface User {
  userId: number;
  nickname: string;
  currentEmail: string;
  creationTime: string;
  emailConfirmed: boolean;
  isCompromised: boolean;
}
