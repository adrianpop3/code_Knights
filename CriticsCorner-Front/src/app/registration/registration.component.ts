import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'app/registration.service';
import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  user:User =new User();

  constructor(private registerService: RegistrationService){}

  ngOnInit(): void{
  }

  userRegister(){
    console.log(this.user)
    this.registerService.registerUser(this.user).subscribe(data=>{
      alert("Succesfully user registered!")
    }, error=>alert("Sorry, user not registered!"));
  }

}

  
