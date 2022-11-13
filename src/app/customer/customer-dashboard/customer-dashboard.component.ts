import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { getAll } from 'src/app/Classes/all-classes';
import { SharedService } from 'src/app/Shared/shared.service';
import { environment } from 'src/environments/environment';
declare var $: any
@Component({
	selector: 'app-customer-dashboard',
	templateUrl: './customer-dashboard.component.html',
	styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
	separateDialCode = true;
	lstgetAll:getAll[];
	objgetAll:getAll;
	baseURL : string ="";
	envData;
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});
	constructor(private sharedservices: SharedService,
		private toastr: ToastrService) {
			this.envData = environment;
			this.lstgetAll = [];
			this.objgetAll = new getAll();
			this.baseURL = this.envData.apiConn.replace("api/","");
		 }

	ngOnInit(): void {

		this.getDetail();
	}

	// /api/Admin/technicians
	getDetail() {
		this.sharedservices.GetDetails("Services/getall").subscribe(rtnData => {
			debugger;
			console.log('rtnData', rtnData);
			if (rtnData.haserror == false) {
				this.lstgetAll =rtnData.result;
				for(var i = 0 ; i < this.lstgetAll.length ; i++){
					this.lstgetAll[i].imageUrl = this.baseURL + this.lstgetAll[i].imageUrl
				}
			} else {
				this.toastr.success('error!', 'some Error Occured!');
			}
		});
	}

	changeRout(id : any){
		this.objgetAll = this.lstgetAll.filter( x=> x.id == id)[0];
		this.sharedservices.objgetAll = this.objgetAll;
		this.sharedservices.Redirect('customer/generateBooking');
	}
}

