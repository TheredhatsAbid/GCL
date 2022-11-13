import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechDashboardComponent } from './tech-dashboard/tech-dashboard.component';
import { TechSideMenuComponent } from './tech-side-menu/tech-side-menu.component';

const routes: Routes = [
  {
  path: '',
  component: TechSideMenuComponent,
  children: [
    {
      path: 'dashboard',
      component: TechDashboardComponent,
    },
    {
      path: 'dashboard_new',
      component: TechDashboardComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianRoutingModule { }
