import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSideMenuComponent } from './admin-side-menu/admin-side-menu.component';
import { AllJobComponent } from './all-job/all-job.component';
import { AssignedJobComponent } from './assigned-job/assigned-job.component';
import { ChatComponent } from './chat/chat.component';
import { CustomerRatingComponent } from './customer-rating/customer-rating.component';
import { TechnicianComponent } from './technician/technician.component'

const routes: Routes = [
  {
    path: '',
    component: AdminSideMenuComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'alljob',
        component: AllJobComponent,
      },
      {
        path: 'technician',
        component: TechnicianComponent,
      },
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'customerrating',
        component: CustomerRatingComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
