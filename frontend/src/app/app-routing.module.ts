import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { GuardService } from './services/guard.service';
import { StarterComponent } from './pages/starter/starter.component';
import { ViewComponent } from './pages/view/view.component';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'starter', component: StarterComponent,  },
  { path: 'view', component: ViewComponent },
  { path: 'order', component: OrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
