import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();

  constructor(private loginService: LoginService) {}

  userLogin() {
    this.loginService.loginUser(this.user)
      .subscribe(data => {
        alert("Login successfully!")
      }, error => alert("Login failed!"));
  }
}
