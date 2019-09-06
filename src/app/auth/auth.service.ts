import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe,throwError } from 'rxjs';
import{catchError} from 'rxjs/operators'

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signUp(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDwBDbLVXCUhDDfdtHAqZuRWQxZeoOzKY',
      {
        email: email,
        password: password,
        returnSecureToken: true

      }).pipe(catchError(errorRes=>{
        let errorMessage="An error Occured";
        if(!errorRes.error || errorRes.error.error){
          return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
          case "EMAIL_EXISTS":
          errorMessage="An email is already exists."
        }
        return throwError(errorMessage);
      }))
      
  }
}
