import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from 'app/classes/user';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();

  constructor(private loginService: LoginService, private router: Router) {}

  // loginForm = new FormGroup({
  //   username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]')]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  // })

  userLogin() {
    this.loginService.loginUser(this.user)
      .subscribe(data => {
        this.router.navigate(['/home']);
      }, error => alert("Login failed!"));
  }
}
