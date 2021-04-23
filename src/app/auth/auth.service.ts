import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError,  BehaviorSubject } from 'rxjs';

export interface AuthenticationResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private _tokenExpirationTimer: any;
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthenticationResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5k7RkVTeka1EDI6FC_NZ-9K15F2Euuzo',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handlerError),
        tap(this.saveUser.bind(this))
      );
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthenticationResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5k7RkVTeka1EDI6FC_NZ-9K15F2Euuzo', {
      email,
      password,
      returnSecureToken: true
    })
    .pipe(
      catchError(this.handlerError),
      tap(this.saveUser.bind(this))
    );
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
       _token: string,
       _tokenExpireData: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpireData));

    if (loadedUser.token) {
      const expirationTime = new Date(userData._tokenExpireData).getTime() - new Date().getTime();

      this.user.next(loadedUser);
      this.autoLogout(expirationTime);
    }
  }

  logout() {
    if (this._tokenExpirationTimer) {
      clearTimeout(this._tokenExpirationTimer);
    }
    this._tokenExpirationTimer = null;
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }

  autoLogout(expireTime: number) {
    this._tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expireTime);
  }

  private saveUser(response: AuthenticationResponse) {
    const expireDate = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );
    const user = new User(
      response.email,
      response.localId,
      response.idToken,
      expireDate
    );

    this.user.next(user);
    this.autoLogout(+response.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handlerError(error: HttpErrorResponse) {
    let errorMessage = 'Unexpected error';

    switch (error.error?.error?.message) {
      case 'EMAIL_EXISTS':
          errorMessage = 'E-mail in use.';
          break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid credentials.';
        break;
    }

    return throwError(errorMessage);
  }
}
