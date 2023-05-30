import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z@]')]),
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]')]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    confirmpassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })

  constructor(private authService: AuthService, private router: Router) { }

  submitForm() {
    if(this.registerForm.invalid) {
      return;
    }
  }

  ngOnInit(): void{
  }

  userRegister() {
    this.authService.registerUser(
      this.registerForm.get('email')?.value as string,
      this.registerForm.get('username')?.value as string,
      this.registerForm.get('password')?.value as string,
      ).subscribe(
        (response: any) => {
          this.router.navigate(['/login']);
        },  
        (error: any) => alert("Sorry, registration failed!"));
  }

}

  
