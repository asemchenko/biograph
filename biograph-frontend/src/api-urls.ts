import {environment} from './environments/environment';

export const API_URLS = {
  LOGIN_URL: environment.BASE_URL + '/api/auth/signIn',
  REGISTER_URL: environment.BASE_URL + '/api/auth/signUp',
};
