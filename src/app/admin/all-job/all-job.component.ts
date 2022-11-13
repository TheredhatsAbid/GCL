import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { adminJobmodal, BookingsforTech, getAll, techDetails } from 'src/app/Classes/all-classes';
import { SharedService } from 'src/app/Shared/shared.service';

@Component({
  selector: 'app-all-job',
  templateUrl: './all-job.component.html',
  styleUrls: ['./all-job.component.css']
})
export class AllJobComponent implements OnInit {
  Colmpleted_adminJobmodal: adminJobmodal[];
  Pending_adminJobmodal: adminJobmodal[];
  Open_adminJobmodal: adminJobmodal[];
  techDetails: techDetails[];

  title = 'ng-bootstrap-modal-demo';
  closeResult: string = "";
  modalOptions: NgbModalOptions;
  updateJob: updateJob;
  selectedID: number = 0;
  id: number = 0;
  pagenumber: number = 1;
  pagesize: number = 10;
  objupComingBookings: BookingsforTech
  constructor(private modalService: NgbModal, private sharedservices: SharedService,
    private toastr: ToastrService) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
    this.Colmpleted_adminJobmodal = [];
    this.Pending_adminJobmodal = [];
    this.Open_adminJobmodal = [];
    this.techDetails = [];
    this.updateJob = new updateJob();
    this.objupComingBookings= new BookingsforTech();
  }

  ngOnInit(): void {
    this.getjobs('1');
    this.getTech();
  }

  tabselected(key: any) {
    this.id = key;
    var n = (Number(key)) + 1;
    this.getjobs(n);
  }

  getjobs(type: any) {
    debugger;
    var str = "?type=" + type + "&pagenumber=" + this.pagenumber + "&pagesize=" + this.pagesize
    this.sharedservices.GetDetails("Admin/jobs" + str).subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        if (type == '1') {
          this.Pending_adminJobmodal=[];
          this.Pending_adminJobmodal = rtnData.result;
        }
        else if (type == '2') {
          this.Open_adminJobmodal = rtnData.result;
        }
        else if (type == '3') {
          this.Colmpleted_adminJobmodal = rtnData.result;
        }
      } else {
        this.toastr.success('error!', 'some Error Occured!');
      }
    });
  }

  getTech() {
    //api/Admin/technicians
    this.sharedservices.GetDetails("Admin/technicians").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        this.techDetails = rtnData.result
      } else {
        this.toastr.success('error!', 'some Error Occured!');
      }
    });
  }

  Admin_assignjob() {
    // /api/Admin/assignjob
    debugger
    this.sharedservices.put(this.updateJob, "Admin/assignjob").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        this.toastr.success('success!', 'Assigned successfully!');
        this.getjobs('1');
      } else {
        this.toastr.success('error!', 'some Error Occured!');
      }
    });
  }

  open(content: any, id: any) {
    this.updateJob.bookingid = Number(id);
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      debugger;
      this.updateJob.technicianid = Number(this.selectedID)
      this.Admin_assignjob();

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  viewDetails(id:any) {
    // if(this.showCompleted == true){
      // this.objupComingBookings = this.Pending_adminJobmodal.filter( x=> x.id == id)[0]; 
      // const modalRef = this.modalService.open(PopupModalComponent);
      // modalRef.componentInstance.objcompletedBookings = this.objcompletedBookings;
      // modalRef.componentInstance.isPending = false;
    // }
    // else {
    //   this.objupComingBookings = this.upComingBookings.filter( x=> x.bookingid == id)[0]; 
    //   const modalRef = this.modalService.open(PopupModalComponent);
    //   modalRef.componentInstance.objcompletedBookings = this.objupComingBookings;
    //   modalRef.componentInstance.isPending = true;
    // }
    
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  previous(type: any) {
    if (this.pagenumber != 1) {
      this.pagenumber = this.pagenumber - 1;
      this.getjobs(type)
    }
  }
  next(type: any) {
    this.pagenumber = this.pagenumber + 1;
    this.getjobs(type)
  }
}



export class updateJob {
  bookingid: number = 0
  technicianid: number = 0
}