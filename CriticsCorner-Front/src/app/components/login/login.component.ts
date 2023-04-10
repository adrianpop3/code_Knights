import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from 'app/classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();

  constructor(private loginService: LoginService, private router: Router) {}

  userLogin() {
    this.loginService.loginUser(this.user)
      .subscribe(data => {
        //alert("Login successfully!")
        this.router.navigate(['/home']);
      }, error => alert("Login failed!"));
  }
}
