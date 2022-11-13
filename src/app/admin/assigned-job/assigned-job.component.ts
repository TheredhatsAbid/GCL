import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingReviewResponse } from 'src/app/Classes/all-classes';
import { SharedService } from 'src/app/Shared/shared.service';

@Component({
  selector: 'app-assigned-job',
  templateUrl: './assigned-job.component.html',
  styleUrls: ['./assigned-job.component.css']
})
export class AssignedJobComponent implements OnInit {
  pagenumber: number = 1;
  Pagesize :number = 15;
  Type : any =""
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
getDetail(){
  this.sharedservices.GetWithParam_and_pagination("type",this.Type,'Admin/jobs',"pagenumber",this.pagenumber,this.Pagesize).subscribe(rtnData => {
    debugger;
    console.log('rtnData', rtnData);
    if (rtnData.haserror == false) {
      this.lstBookingReviewResponse =rtnData.result;
    } else {
      this.toastr.success('error!', 'some Error Occured!');
    }
  });


}
Edit(id: any){
  this.objBookingReviewResponse  = this.lstBookingReviewResponse.filter(x=> x.id ==id)[0];
}
Delete(id: any){
  
}  


}
