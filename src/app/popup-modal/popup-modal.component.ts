import { Component, NgZone, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BookingsforTech, MarkBookingcomplete } from '../Classes/all-classes';
import { SharedService } from '../Shared/shared.service';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css']
})
export class PopupModalComponent implements  OnInit {

isPending:boolean = false;
 public objcompletedBookings: BookingsforTech;
 objMarkBookingcomplete : MarkBookingcomplete;
  
  constructor( public activeModal: NgbActiveModal, private ngZone: NgZone ,
     private sharedservices: SharedService,
      private toastr: ToastrService){
    this.objcompletedBookings = new BookingsforTech()
    this.objMarkBookingcomplete = new  MarkBookingcomplete();
   }

  ngOnInit() {
    debugger;
    // console.log(JSON.stringify(this.objcompletedBookings));

  }
  

  MarkasComplete() {
    // /api/Technician/markbookingascomplete
    debugger
    var techID = sessionStorage.getItem('userid');
    this.objMarkBookingcomplete.bookingid = this.objcompletedBookings.bookingid;
    this.objMarkBookingcomplete.technicianid= Number(techID);
    this.objMarkBookingcomplete.feedback = this.objcompletedBookings.feedback;
    this.sharedservices.put(this.objMarkBookingcomplete, "Technician/markbookingascomplete").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        this.toastr.success('success!', 'Completed successfully!');
        let element: HTMLElement = document.getElementById('clspopUp') as HTMLElement;
        element.click();

      } else {
        this.toastr.error('error!', rtnData.message);
        let element: HTMLElement = document.getElementById('clspopUp') as HTMLElement;
        element.click();
      }
    });
 }

}
