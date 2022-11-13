import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSideMenuComponent } from './admin-side-menu/admin-side-menu.component';
import { NgChartsModule } from 'ng2-charts';
import { AllJobComponent } from './all-job/all-job.component';
import { AssignedJobComponent } from './assigned-job/assigned-job.component';
// import { ChatComponent } from './chat/chat.component';
import { CustomerRatingComponent } from './customer-rating/customer-rating.component';
import { TechnicianComponent } from './technician/technician.component';
import { FormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';
// import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminSideMenuComponent,
    AllJobComponent,
    AssignedJobComponent,
    // ChatComponent,
    CustomerRatingComponent,
    TechnicianComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    NgChartsModule
  ]
})
export class AdminModule { }
