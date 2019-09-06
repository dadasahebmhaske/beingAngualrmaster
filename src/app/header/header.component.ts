import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
private userSub:Subscription;
public isAuthenticated:boolean=false;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(user=>{
     this.isAuthenticated=!user?false:true;//short ahand use !!user
    });
  }
ngOnDestroy(){
  this.userSub.unsubscribe();
}
}
