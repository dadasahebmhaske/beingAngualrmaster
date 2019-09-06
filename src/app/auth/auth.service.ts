import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { pipe,throwError, Subject, BehaviorSubject } from 'rxjs';
import{catchError,tap} from 'rxjs/operators';
import{User} from './user.model';
//import { tap } from 'rxjs/internal/operators/tap';

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?:boolean
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
user =  new BehaviorSubject<User>(null);
  constructor(private httpClient: HttpClient) { }

//   signUp(email: string, password: string) {
//     return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDwBDbLVXCUhDDfdtHAqZuRWQxZeoOzKY',
//       {
//         email: email,
//         password: password,
//         returnSecureToken: true

//       }).pipe(catchError(errorRes=>{
//         let errorMessage="An error Occured";
//         if(!errorRes.error || errorRes.error.message){
//           return throwError(errorMessage);
//         }
//         switch(errorRes.error.error.message){
//           case "EMAIL_EXISTS":
//           errorMessage="An email is already exists."
//         }
//         return throwError(errorMessage);
//       }))
      
//   }
signUp(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDwBDbLVXCUhDDfdtHAqZuRWQxZeoOzKY',
      {
        email: email,
        password: password,
        returnSecureToken: true

      }).pipe(catchError(this.handleError),tap(resData=>{
          const expirationDate=new Date(new Date().getTime()+ +resData.expiresIn*1000)
          const user= new User(resData.email,resData.localId,resData.idToken,expirationDate);
         this.user.next(user);
        }));
      
  }
  logIn(email: string, password: string) {
      return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDwBDbLVXCUhDDfdtHAqZuRWQxZeoOzKY',
    {       email: email,
        password: password,
        returnSecureToken: true
    }).pipe(catchError(this.handleError),tap(resData=>{
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
    }));
  }
  getUser(token){
      return this.httpClient.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBDwBDbLVXCUhDDfdtHAqZuRWQxZeoOzKY',{
        idToken:token
      }).pipe(catchError(this.handleError));
  }
  
  //common authen user handling with tap operator
  private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
    const expirationDate=new Date(new Date().getTime()+ +expiresIn*1000);
    const user= new User(email,userId,token,expirationDate);
   this.user.next(user);
  }
  //common error handling method
  private handleError(errorRes:HttpErrorResponse){
    let errorMessage="An error Occured";
    if(!errorRes.error || errorRes.error.message){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case "EMAIL_EXISTS":
      errorMessage="An email is already exists.";
      break;
      case "EMAIL_NOT_FOUND":
      errorMessage="This email does not exists";
      break;
      case "INVALID_PASSWORD":
      errorMessage="Password is not correct";
      break;
    }
    return throwError(errorMessage);
  }
}
