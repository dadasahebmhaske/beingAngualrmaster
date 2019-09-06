import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService,AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
isLoginMode=true;
isLoading=false;
error:string=null;
  constructor(private authservice:AuthService) { }

  ngOnInit() {
   
  }
onSwitchMode(){
  this.isLoginMode=false;
}
onSubmit(form:NgForm){
  this.isLoading=true;
  if(!form.valid){
    return;
  }
const email=form.value.email;
const password=form.value.password;

let authObs: Observable<AuthResponseData>;
if(this.isLoginMode){
  authObs = this.authservice.logIn(email,password);
 }else{
  authObs = this.authservice.signUp(email,password);
  //for if u dontg want use common code use below seprate with authObs
  // this.authservice.signUp(email,password).subscribe(resData=>{
  //   console.log(resData);
  //   this.isLoading=false;
  //   },errorMessage=>{
  //     console.log(errorMessage);
  //     this.error=errorMessage;      
  //     this.isLoading=false;
  //   }
  //   );
     
}
authObs.subscribe(resData=>{
  console.log(resData);
  this.isLoading=false;
  },errorMessage=>{
    console.log(errorMessage);
    this.error=errorMessage;      
    this.isLoading=false;
  }
  );
form.reset();
}
}
