import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/classes/user';
import { Observable, map } from 'rxjs';
//import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl="http://localhost:8081/auth/login";

  constructor(private httpClient: HttpClient ) { }

  loginUser(user: User): Observable<object> {
    return this.httpClient.post(`${this.baseUrl}`, user)
    // .pipe(
    //   map((response: any) => {
    //     const token = jwt.sign({ id: response.id }, 'secret-key');
    //     localStorage.setItem('token', token);
    //     return response;
    //   })
    // );
  }
}
