import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TechnicianResponse } from 'src/app/Classes/all-classes';
import { SharedService } from 'src/app/Shared/shared.service';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.css']
})
export class TechnicianComponent implements OnInit {

  lstTechnicianResponse : TechnicianResponse[];
  objTechnicianResponse : TechnicianResponse;
  constructor(private sharedservices: SharedService,
		private toastr: ToastrService)  { 
      this.lstTechnicianResponse  =[];
      this.objTechnicianResponse  = new TechnicianResponse();
    }

  ngOnInit(): void {
    this.getDetail();
  }

  // /api/Admin/technicians
getDetail(){
  this.sharedservices.GetDetails("Admin/technicians").subscribe(rtnData => {
    debugger;
    console.log('rtnData', rtnData);
    if (rtnData.haserror == false) {
      this.lstTechnicianResponse =rtnData.result;
    } else {
      this.toastr.success('error!', 'some Error Occured!');
    }
  });


}
Edit(id: any){
  this.objTechnicianResponse = this.lstTechnicianResponse.filter(x=> x.id ==id)[0];
}
Delete(id: any){
  
}  

}
