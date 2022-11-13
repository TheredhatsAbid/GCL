import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { StripeModule } from 'stripe-angular';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ChatService } from './chat.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { EvaluateComponent } from './evaluate/evaluate/evaluate.component';
import { ChatComponent } from './admin/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PopupModalComponent,
    EvaluateComponent,
    ChatComponent,

  ],
  imports: [	
    BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		NgxIntlTelInputModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    Ng2TelInputModule,
    StripeModule.forRoot(""),
    HttpClientModule, 
    
   
  ],
  providers: [  {provide: LocationStrategy, useClass: HashLocationStrategy} , ChatService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
