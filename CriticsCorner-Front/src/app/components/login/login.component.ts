import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(private authService: AuthService, private router: Router) {}

  submitForm() {
    if(this.loginForm.invalid) {
      return;
    }
  }

  userLogin() {
    this.authService.loginUser(
      this.loginForm.get('username')?.value as string,
      this.loginForm.get('password')?.value as string,
    ).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      (error: any) => alert('Login failed!')
    );
  }
  
}
