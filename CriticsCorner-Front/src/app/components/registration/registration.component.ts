import { Component, OnInit } from '@angular/core';
import { User } from 'app/classes/user';
import { RegistrationService } from 'app/services/registration.service';

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

  
