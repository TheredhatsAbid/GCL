import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  //  { path: '', component: AdminLoginComponent },
  //  { path: 'login', component: AdminLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tech', loadChildren: () => import('./technician/technician.module').then(m => m.TechnicianModule) },
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  // imports: [RouterModule.forChild(routes )],
  // exports: [RouterModule]
})
export class AppRoutingModule { }
