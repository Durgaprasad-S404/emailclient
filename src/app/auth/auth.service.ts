import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupCredentials } from '../signup_credentials';
import { SigninCredentials } from '../signin_credentials';
import { BehaviorSubject, tap, Observable } from 'rxjs';

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SigninResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl: string = 'https://api.angular-email.com';
  signedin$: BehaviorSubject<any> = new BehaviorSubject(null);
  username: string = '';

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string): Observable<{ available: boolean }> {
    return this.http.post<{ available: boolean }>(
      this.rootUrl + '/auth/username',
      {
        username: username,
      }
    );
  }

  signup(credentials: SignupCredentials): Observable<SignupResponse> {
    return this.http
      .post<SignupResponse>(this.rootUrl + '/auth/signup', credentials)
      .pipe(
        tap((response) => {
          this.signedin$.next(true);
          this.username = response.username;
        })
      );
  }

  checkAuth(): Observable<SignedinResponse> {
    return this.http
      .get<SignedinResponse>(this.rootUrl + '/auth/signedin')
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.username = username;
        })
      );
  }

  signout(): Observable<Object> {
    return this.http.post(this.rootUrl + '/auth/signout', {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SigninCredentials): Observable<Object> {
    return this.http
      .post<SignedinResponse>(this.rootUrl + '/auth/signin', credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }
}
