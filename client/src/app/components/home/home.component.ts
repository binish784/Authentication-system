import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  content:string;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.authService.getHomeData().subscribe(response=>{
      this.content=response["msg"] + "Your Login Token expires in "+response["expires"]+". After that you will have to login again.";
    },error=>{
      console.log(error);
      if(error instanceof HttpErrorResponse){
        if(error.status==400 || error.status==403 || error.status==500){
          this.router.navigate(["login"]);
        }
      }
    })
  }
}
