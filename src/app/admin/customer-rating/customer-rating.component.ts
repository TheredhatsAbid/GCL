import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingReviewResponse } from 'src/app/Classes/all-classes';
import { SharedService } from 'src/app/Shared/shared.service';

@Component({
  selector: 'app-customer-rating',
  templateUrl: './customer-rating.component.html',
  styleUrls: ['./customer-rating.component.css']
})
export class CustomerRatingComponent implements OnInit {
  pagenumber: number = 1;
  Pagesize :number = 10;
  objBookingReviewResponse:BookingReviewResponse;
  lstBookingReviewResponse:BookingReviewResponse[];
  constructor(private sharedservices: SharedService,
		private toastr: ToastrService)  {
      this.objBookingReviewResponse = new BookingReviewResponse();
      this.lstBookingReviewResponse = [];
     }

  ngOnInit(): void {
    this.getDetail();
  }

  

  // /api/Admin/technicians
  getDetail() {
    this.sharedservices.noParam_GetDetails_pagination("Admin/bookingreviews","pagenumber","pagesize", this.pagenumber,this.Pagesize ).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        this.lstBookingReviewResponse = rtnData.result;
      } else {
        this.toastr.success('error!', 'some Error Occured!');
      }
    });


  }
  Edit(id: any) {
    this.objBookingReviewResponse = this.lstBookingReviewResponse.filter(x => x.id == id)[0];
  }
  Delete(id: any) {

  }

  previous(type: any) {
    if (this.pagenumber != 1) {
      this.pagenumber = this.pagenumber - 1;
      this.getDetail()
    }
  }
  next(type: any) {
    this.pagenumber = this.pagenumber + 1;
    this.getDetail()
  }
}
