import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BookingsforTech, getAll, MarkBookingcomplete } from 'src/app/Classes/all-classes';
import { PopupModalComponent } from 'src/app/popup-modal/popup-modal.component';
import { SharedService } from 'src/app/Shared/shared.service';

@Component({
  selector: 'app-tech-dashboard',
  templateUrl: './tech-dashboard.component.html',
  styleUrls: ['./tech-dashboard.component.css']
})
export class TechDashboardComponent implements OnInit {
  @Input() name: string = "";
  lstcompletedjobs: getAll[];
  lstpendingjobs: getAll[];
  upComingBookings: BookingsforTech[]
  completedBookings: BookingsforTech[]

  objupComingBookings: BookingsforTech
  objcompletedBookings: BookingsforTech


  objgetAll: getAll;
  showCompleted: boolean = false;
  showpending: boolean = true;
  constructor(private modalService: NgbModal, private sharedservices: SharedService,
    private toastr: ToastrService) {
    this.lstcompletedjobs = [];
    this.lstpendingjobs = [];
    this.objgetAll = new getAll();
    this.upComingBookings = []
    this.completedBookings = []


      this.objupComingBookings = new BookingsforTech()
      this.objcompletedBookings= new  BookingsforTech()

  }
  ngOnInit(): void {
    this.pendingjobs();
    this.completedjobs();
  }

  showTable(key: any) {
    if (key == 'O') {
      this.showCompleted = false;
      this.showpending = true;
    }
    else {
      this.showCompleted = true;
      this.showpending = false;
    }
  }
  open(id:any) {
    if(this.showCompleted == true){
      this.objcompletedBookings = this.completedBookings.filter( x=> x.bookingid == id)[0]; 
      const modalRef = this.modalService.open(PopupModalComponent);
      modalRef.componentInstance.objcompletedBookings = this.objcompletedBookings;
      modalRef.componentInstance.isPending = false;
    }
    else {
      this.objupComingBookings = this.upComingBookings.filter( x=> x.bookingid == id)[0]; 
      const modalRef = this.modalService.open(PopupModalComponent);
      modalRef.componentInstance.objcompletedBookings = this.objupComingBookings;
      modalRef.componentInstance.isPending = true;
    }
    
  }

//api/Technician/pendingjobs
pendingjobs() {
    this.sharedservices.GetDetails("Technician/pendingjobs").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        this.upComingBookings = rtnData.result.upComingBookings;
      } else {
        this.toastr.error('error!', rtnData.message);
      }
    });
}

  //api/Technician/completedjobs
completedjobs() {
    this.sharedservices.GetDetails("Technician/completedjobs").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        this.completedBookings = rtnData.result.completedBookings;
      } else {
        this.toastr.error('error!', rtnData.message);
      }
    });
    
}
}
  