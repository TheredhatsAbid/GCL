import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerSideMenuComponent } from './customer-side-menu/customer-side-menu.component';
import { BookingComponent } from './booking/booking.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
// import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

import { MatInputModule  
} from '@angular/material/input';

import { MatListModule} from '@angular/material/list';
  // MatMenuModule,
  // MatNativeDateModule,
  // MatPaginatorModule,
  // MatProgressBarModule,
  // MatProgressSpinnerModule,
  // MatRadioModule,
  // MatRippleModule,
  // MatSelectModule,
  // MatSidenavModule,
  // MatSliderModule,
  // MatSlideToggleModule,
  // MatSnackBarModule,
  // MatSortModule,
  // MatStepperModule,
  // MatTableModule,
  // MatTabsModule,
  // MatToolbarModule,
  // MatTooltipModule,
  // MatTreeModule,
  // MatAutocompleteModule,
  // MatBadgeModule,
  // MatBottomSheetModule,
  // MatButtonModule,
  // MatButtonToggleModule,
  // MatCardModule,
  // MatCheckboxModule,
  // MatChipsModule,
  import {  MatDatepickerModule} from '@angular/material/datepicker';
  import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPayPalModule } from 'ngx-paypal';
  // MatDialogModule,
  // MatDividerModule,
  // MatExpansionModule,
  // MatGridListModule,
  // MatIconModule,



@NgModule({
  declarations: [
    CustomerDashboardComponent,
    CustomerSideMenuComponent,
    BookingComponent,
    MyBookingComponent,
    CustomerProfileComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
     // MatAutocompleteModule,
    // MatBadgeModule,
    // MatBottomSheetModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatCardModule,
    // MatCheckboxModule,
    // MatChipsModule,
    // MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MatDialogModule,
    // MatDividerModule,
    // MatExpansionModule,
    // MatGridListModule,
    // MatIconModule,
    MatInputModule,
    MatListModule,
    // MatMenuModule,
    // MatNativeDateModule,
    // MatPaginatorModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatTableModule,
    // MatTabsModule,
    // MatToolbarModule,
    // MatTooltipModule,
    // MatTreeModule,
    // ScrollingModule,
    
    NgbModule,
    NgxPayPalModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule 
  ]
})
export class CustomerModule { }
