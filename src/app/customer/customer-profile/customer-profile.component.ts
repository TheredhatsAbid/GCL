import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserProfileResponse } from 'src/app/Classes/all-classes';
import { SharedService } from 'src/app/Shared/shared.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  UserProfileResponse:UserProfileResponse[];
  objUserProfileResponse:UserProfileResponse;
  constructor(
    private sharedservices: SharedService,
    private toastr: ToastrService
  ) { 
    this.UserProfileResponse = [];
    this.objUserProfileResponse = new UserProfileResponse();

  }

  ngOnInit(): void {
    this.GetProfile();
  }
  //api/Booking/CompletedBookings

  GetProfile(){
    var userID = sessionStorage.getItem('userid');
    this.sharedservices.GetDetails("Customer/GetProfile").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        // this.UserProfileResponse = rtnData.result;
        this.objUserProfileResponse = rtnData.result;
      } else {
        this.toastr.success('error!', 'some Error Occured!');
      }
    });
  }

  //api/Customer/GetProfile
}
