import {environment} from './environments/environment';

export const API_URLS = {
  LOGIN_URL: environment.BASE_URL + '/api/auth/signIn',
  REGISTER_URL: environment.BASE_URL + '/api/auth/signUp',
  // TODO asem remove in prod. Just for test
  TEST_URL: environment.BASE_URL + '/home/secured',
  ATTRIBUTE_URL: environment.BASE_URL + '/api/attribute'
};
