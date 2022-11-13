import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluateComponent } from '../evaluate/evaluate/evaluate.component';
import { BookingComponent } from './booking/booking.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerSideMenuComponent } from './customer-side-menu/customer-side-menu.component';
import { MyBookingComponent } from './my-booking/my-booking.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerSideMenuComponent,
    children: [
      {
        path: 'dashboard',
        component: CustomerDashboardComponent,
      },
      {
        path: 'generateBooking',
        component: BookingComponent,
      }
      ,{
        path: 'mybooking',
        component: MyBookingComponent
      },{
        path: 'profile',
        component:  CustomerProfileComponent
      }
      ,{
        path: 'Evaluate',
        component:  EvaluateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
