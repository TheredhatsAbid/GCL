import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { login, SignInResponse } from 'src/app/Classes/all-classes';
import { SharedService } from 'src/app/Shared/shared.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
	selectedValue: string = "Customer";
	objlogin: login;
	showOTP: boolean = false;
	objSignInResponse: SignInResponse;
	objVerifyLogin: VerifyLogin;

	ist: string = "";
	sec: string = "";
	third: string = "";
	fourth: string = "";
	fifth: string = "";
	sixth: string = "";

	title = 'ng-bootstrap-modal-demo';
	closeResult: string = "";
	modalOptions: NgbModalOptions;

	constructor(private sharedservices: SharedService,
		private toastr: ToastrService ,private modalService: NgbModal) {
			this.modalOptions = {
				backdrop: 'static',
				backdropClass: 'customBackdrop'
			  }
		this.objlogin = new login();
		this.objSignInResponse = new SignInResponse();
		this.objVerifyLogin = new VerifyLogin();
	}

	ngOnInit(): void {
	}

	separateDialCode = true;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
	PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required]),
		PhoneNumber: new FormControl(undefined, [Validators.required]),
		email: new FormControl(undefined, [Validators.required]),
		password: new FormControl(undefined, [Validators.required]),
	});
	types = ['Technician', 'Customer'];
	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}

	login() {
		debugger;
			this.sharedservices.post(this.objlogin, "SignIn/admin").subscribe(rtnData => {
				debugger;
				console.log('rtnData', rtnData);
				if (rtnData.haserror == false) {
					this.objSignInResponse = rtnData.result;
					sessionStorage.setItem('userid', this.objSignInResponse.userid.toString());
					sessionStorage.setItem("token", rtnData.result.authtoken);
					sessionStorage.setItem("refresh_token", rtnData.result.refreshtoken.toString())
					sessionStorage.setItem("email", rtnData.result.email.toString());
					sessionStorage.setItem("firstname", rtnData.result.firstname);
					sessionStorage.setItem("lastname", rtnData.result.lastname);
					sessionStorage.setItem("userid", rtnData.result.userid);
					sessionStorage.setItem("serviceid", "1")
					sessionStorage.setItem("servicename",'Test Service')
					this.sharedservices.Redirect('admin/dashboard');
				} else {
					this.toastr.success('error!', 'some Error Occured!');
				}
			});		
	}
	onChangeName($event: any) {
		console.log(this.selectedValue);

	}
	Route(str: any) {
		this.sharedservices.Redirect(str);
	}


	keytab(event: KeyboardEvent,currentID:any){
		debugger;
		if(currentID =="ist"){
			let element: HTMLElement = document.getElementById('sec') as HTMLElement;
			element.focus();			
		}
		if(currentID =="sec"){
			let element: HTMLElement = document.getElementById('third') as HTMLElement;
			element.focus();			
		}
		if(currentID =="third"){
			let element: HTMLElement = document.getElementById('fourth') as HTMLElement;
			element.focus();			
		}
		if(currentID =="fourth"){
			let element: HTMLElement = document.getElementById('fifth') as HTMLElement;
			element.focus();			
		}
		if(currentID =="fifth"){
			let element: HTMLElement = document.getElementById('sixth') as HTMLElement;
			element.focus();			
		}
	}


	clickEvent(first: any, last: any) {
		if (first.value.length) {
			// document.getElementById(last).focus();
		}
	}

	VerifyLogin() {

		this.objVerifyLogin.userid = this.objSignInResponse.userid;
		var getnum = this.ist + "" + this.sec + "" + this.third + "" + this.fourth + "" + this.fifth + "" + this.sixth;

		this.objVerifyLogin.emailcode = Number(getnum);
		this.sharedservices.post(this.objVerifyLogin, "SignIn/VerifyLogin").subscribe(rtnData => {
			debugger;
			console.log('rtnData', rtnData);
			if (rtnData.haserror == false)  {
				if(rtnData.result.authtoken != null){
					this.objSignInResponse = rtnData.result;
					sessionStorage.setItem("token", rtnData.result.authtoken);
					sessionStorage.setItem("refresh_token", rtnData.result.refreshtoken.toString())
					sessionStorage.setItem("email", rtnData.result.email.toString());
					sessionStorage.setItem("firstname", rtnData.result.firstname);
					sessionStorage.setItem("lastname", rtnData.result.lastname);
					sessionStorage.setItem("userid", rtnData.result.userid);
					// sessionStorage.setItem("serviceid", "1")
					// sessionStorage.setItem("servicename",'Test Service')

					if (this.selectedValue == "Technician"){
						let element: HTMLElement = document.getElementById('btncloseid') as HTMLElement;
						element.click();
						this.sharedservices.Redirect('tech/dashboard');
					}
					else {
						let element: HTMLElement = document.getElementById('btncloseid') as HTMLElement;
						element.click();
						this.sharedservices.Redirect('customer/dashboard');
					}
				}else{
					this.toastr.success('error!', rtnData.message.toString());
				}

				//	
			} else {
				this.toastr.success('error!', 'some Error Occured!');
			}
		});
	}

	///api/SignIn/VerifyLogin

	open(content: any) {

		this.modalService.open(content, this.modalOptions).result.then((result) => {
		  debugger;
		  this.VerifyLogin();
		}, (reason) => {
		  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
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
}


export class VerifyLogin {
	userid: number;
	emailcode: number;

	/**
	 *
	 */
	constructor() {
		this.userid = 0;
		this.emailcode = 0;
	}
}