import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/classes/user';
import { RegistrationService } from 'app/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  user:User =new User();

  constructor(private registerService: RegistrationService, private router: Router){}

  ngOnInit(): void{
  }

  userRegister() {
    this.registerService.registerUser(this.user)
      .subscribe(data => {
        this.router.navigate(['/login']);
    },  error=>alert("Sorry, registration failed!"));
  }

}

  
