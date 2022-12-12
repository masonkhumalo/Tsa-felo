import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarterComponent } from './pages/starter/starter.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup' 
import { GuardService } from './services/guard.service';
import { UserService } from './services/user.service';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TabComponent } from './components/tab/tab.component';
import { ViewComponent } from './pages/view/view.component';
import { OrderComponent } from './pages/order/order.component';



@NgModule({
  declarations: [
    
    AppComponent,
    StarterComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    TabComponent,
    ViewComponent,
    OrderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
   

  ],
  providers: [GuardService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
