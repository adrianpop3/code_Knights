import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  baseUrl="http://localhost:8081/user";
  constructor(private httpClient: HttpClient) { 
  }

  registerUser(user: User): Observable<Object>{
    console.log(user);
    return this.httpClient.post('${this.baseUrl}', user);
  }
}
