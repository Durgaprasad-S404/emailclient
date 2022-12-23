import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  rootUrl: string = 'https://api.angular-email.com';
  usernameAvailable: string = this.rootUrl + '/auth/username';
  signup: string = this.rootUrl + '/auth/signup';
  signin: string = this.rootUrl + '/auth/signin';
  checkAuth: string = this.rootUrl + '/auth/signedin';
  signout: string = this.rootUrl + 'auth/signout';
  constructor() {}
}
