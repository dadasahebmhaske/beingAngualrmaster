import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { pipe,throwError, } from 'rxjs';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  isLoading = false;
  constructor(private authservice: AuthService, private httpClient: HttpClient) { }

  ngOnInit() {
    //getuser from service
   this.getuserWithUserSubscription();
    //getuser witout service
    //this.getUser();
  }
  getuserWithUserSubscription(){
    let token;
    this.authservice.user.subscribe(user => {
      token = user.token;
    });
    this.isLoading = true;
    this.authservice.getUser(token).subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
    }, errorMessage => {
      console.log(errorMessage);
      // this.error=errorMessage;      
      this.isLoading = false;
    }
    );
  }
  // getUser() {
  //   this.authservice.user.pipe(take(1), exhaustMap(user => {
  //      this.httpClient.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBDwBDbLVXCUhDDfdtHAqZuRWQxZeoOzKY', {
  //       idToken: user.token
  //     }).subscribe(rsData=>{
  //       console.log(rsData)
  //     },
  //     error=>{
  //       console.log(error)
  //     });
  //   }));
  // }

}
