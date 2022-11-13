import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserBookingResponse } from 'src/app/Classes/all-classes';
import { SharedService } from 'src/app/Shared/shared.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {

  lstUpComingBookings : UserBookingResponse[];
  lstCompletedBookings : UserBookingResponse[];
  Pagination_lstUpComingBookings : UserBookingResponse[];
  
  constructor(
    private sharedservices: SharedService,
    private toastr: ToastrService
  ) { 
    this.lstUpComingBookings = [];
    this.lstCompletedBookings = [];
    this.Pagination_lstUpComingBookings = [];
  }

  ngOnInit(): void {
    this.CompletedBookings();
    this.UpComingBookings();
  }
  //api/Booking/CompletedBookings

  CompletedBookings(){
    this.sharedservices.GetDetails("Booking/CompletedBookings").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        this.lstCompletedBookings = rtnData.result.completedBookings
      } else {
        this.toastr.success('error!', 'some Error Occured!');
      }
    });
  }

  //api/Booking/UpComingBookings

  UpComingBookings(){
    this.sharedservices.GetDetails("Booking/UpComingBookings").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        // this.lstBookingReviewResponse =rtnData.result;
            this.lstUpComingBookings = rtnData.result.upComingBookings;
            this.Pagination_lstUpComingBookings =     this.lstUpComingBookings.splice(0,5) 
    
      } else {
        this.toastr.success('error!', 'some Error Occured!');
      }
    });
  }
}
