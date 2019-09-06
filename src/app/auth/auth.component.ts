import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from './auth.service';

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
if(this.isLoginMode){

}else{
  this.authservice.signUp(email,password).subscribe(resData=>{
    console.log(resData);
    this.isLoading=false;
    },errorRes=>{
      console.log(errorRes);
  
      
      this.isLoading=false;
    }
    );
     
}
form.reset();
}
}
