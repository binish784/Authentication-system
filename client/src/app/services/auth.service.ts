import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  httpOptions={
    "headers":new HttpHeaders({
      "Content-Type":"application/json"
    })
  }

  url:string="http://localhost:5000/";

  constructor(private http:HttpClient) { }

  
  loginUser(payload){
    const login_url=this.url+"login";
    return this.http.post<any>(login_url,payload,this.httpOptions);
  }

  loggedIn(){
    return (!!localStorage.getItem("token"));
  }

  registerUser(payload){
    const register_url=this.url+"register";
    return this.http.post<any>(register_url,payload,this.httpOptions);
  }

  getToken(){
    return localStorage.getItem("token");
  }
}
