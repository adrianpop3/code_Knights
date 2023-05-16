import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public baseUrl="http://localhost:8081/auth/login";

  constructor(private httpClient: HttpClient ) { }

  loginUser(user: User): Observable<object> {
    return this.httpClient.post(`${this.baseUrl}`, user);
  }
}
