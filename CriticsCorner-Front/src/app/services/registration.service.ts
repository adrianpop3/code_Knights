import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  baseUrl="http://localhost:8081/auth/register";
  constructor(private httpClient: HttpClient) { 
  }

  registerUser(user: User): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, user);
  }
}
