import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  title:string="Register User";

  username:string;
  email:string;
  password:string;

  message:string;

  constructor(
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit() {
  }

  onSubmit(){
    var payload={
      "username":this.username,
      "password":this.password,
      "email":this.email
    }
    this.authService.registerUser(payload).subscribe(response=>{
      this.message=this.username + " has been registered";
      console.log(response);
      localStorage.setItem("token",response.token);
      this.router.navigate(["home"]);
    },error=>{
      console.log(error);
      this.message=(error.error.msg);
    });
    
  }

}