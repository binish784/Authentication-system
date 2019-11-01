import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from "./components/signup/signup.component";
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:SignupComponent},
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
