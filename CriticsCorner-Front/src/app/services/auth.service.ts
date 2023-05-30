import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/entities/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this._isLoggedIn.asObservable();
  private readonly TOKEN_NAME = 'user_key';
  user: User | null;

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  public baseUrl="http://localhost:8081/auth";

  constructor( private httpClient: HttpClient, private router: Router ) { 
    this._isLoggedIn.next(!!this.token);
    this.user = this.getUser(this.token);
  }

  registerUser(email: string, username: string, password: string): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/register`, { email, username, password })
      .pipe(
        tap(
          (response: any) => {
            // Registration success
            console.log("Registration successful", response);
          },
          (error: HttpErrorResponse) => {
            // Registration error
            console.error("Registration failed:", error);
          }
        )
      );
  }


  loginUser(username: string, password: string): Observable<object> {
    return this.httpClient.post(`${this.baseUrl}/login`, {username, password}).pipe(
      tap((response: any) => {
        this._isLoggedIn.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.token);
        this.user = this.getUser(response.token);
      })
    );
  }

  private getUser(token: string): User | null {
    if (!token) {
      return null;
    }
  
    try {
      const decodedToken = window.atob(token.split('.')[1]);
      const user: User = JSON.parse(decodedToken);
      return user;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  
  hasRole(role: string): boolean {
    return this.user?.roles?.includes(role) ?? false;
  }
  
  logout(): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/logout`, null).pipe(
      tap(() => {
        localStorage.removeItem(this.TOKEN_NAME);
        this._isLoggedIn.next(false);
        //this.user = undefined;
        this.router.navigate(['/login']);
      })
    );
  }
  
}
