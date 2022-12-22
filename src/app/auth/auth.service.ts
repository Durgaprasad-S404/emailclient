import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupCredentials } from '../signup_credentials';
import { SigninCredentials } from '../signin_credentials';
import { BehaviorSubject, tap, Observable } from 'rxjs';
import { EndpointsService } from '../endpoints.service';

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
  signedin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  username: string = '';

  constructor(private http: HttpClient, private endpoints: EndpointsService) {}

  usernameAvailable(username: string): Observable<{ available: boolean }> {
    return this.http.post<{ available: boolean }>(
      this.endpoints.usernameAvailable,
      {
        username: username,
      }
    );
  }

  signup(credentials: SignupCredentials): Observable<SignupResponse> {
    return this.http
      .post<SignupResponse>(this.endpoints.signup, credentials)
      .pipe(
        tap((response) => {
          this.signedin$.next(true);
          this.username = response.username;
        })
      );
  }

  checkAuth(): Observable<SignedinResponse> {
    return this.http.get<SignedinResponse>(this.endpoints.checkAuth).pipe(
      tap(({ authenticated, username }) => {
        this.signedin$.next(authenticated);
        this.username = username;
      })
    );
  }

  signout(): Observable<Object> {
    return this.http.post(this.endpoints.signout, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SigninCredentials): Observable<Object> {
    return this.http
      .post<SignedinResponse>(this.endpoints.signin, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }
}
