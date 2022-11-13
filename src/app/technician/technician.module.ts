import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicianRoutingModule } from './technician-routing.module';
import { TechDashboardComponent } from './tech-dashboard/tech-dashboard.component';
import { TechSideMenuComponent } from './tech-side-menu/tech-side-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';


@NgModule({
  declarations: [
    TechDashboardComponent,
    TechSideMenuComponent,
    // PopupModalComponent
  ],
  imports: [
    CommonModule,
    TechnicianRoutingModule,
    NgbModule
  ],
  entryComponents: [
    // PopupModalComponent
  ],
})
export class TechnicianModule { }
