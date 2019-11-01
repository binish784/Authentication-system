import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title:string= "Login-Form";

  message:string;

  email:string;
  password:string;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  onSubmit(){
    const payload={
      "email":this.email,
      "password":this.password
    }
    this.authService.loginUser(payload).subscribe(response=>{
      if(response){
        this.message=response.msg;
      }
      localStorage.setItem("token",response.token);
      this.router.navigate(["home"]);
      console.log(response);
    },error=>{
      console.log(error);
      this.message=error.error.msg;
    })
  }

}
