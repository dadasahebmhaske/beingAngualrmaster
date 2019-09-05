import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DepartmentComponent } from './department/department.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DepartmentComponent,
    DashboardComponent,
    UserlistComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
