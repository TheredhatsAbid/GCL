import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { eveluation, getAll, subservices } from 'src/app/Classes/all-classes';
import { GlobalService } from 'src/app/Global/global.service';
import { SharedService } from 'src/app/Shared/shared.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {

	lstgetAll:getAll[];
	objgetAll:getAll;
  selectedID: string = "";
  lstsubservices : subservices[];
  userid: string = "";
  image: File | undefined;
  resData: any;
  selectedFile :any;
  baseURL : string ="";
  imageString:string = "";
  envData;
  objeveluation: eveluation; 
  isNew:boolean = true;

  constructor(private sharedservices: SharedService,
		private toastr: ToastrService,
    public sanitizer: DomSanitizer,
    private Global: GlobalService,
    private http: HttpClient) { 
      this.lstgetAll = [];
      this.objgetAll = new getAll;
      this.lstsubservices = [];
      this.envData = environment;
      this.baseURL = this.envData.apiConn;
      this.objeveluation = new  eveluation();
    }

  ngOnInit(): void {
    var uid = sessionStorage.getItem("userid");
    this.userid = this.Global.convertToString(uid);
    this.getDetail();
  }

  getDetail() {
		this.sharedservices.GetDetails("Services/getall").subscribe(rtnData => {
			debugger;
			console.log('rtnData', rtnData);
			if (rtnData.haserror == false) {
				this.lstgetAll =rtnData.result;
			} else {
				this.toastr.success('error!', 'some Error Occured!');
			}
		});
	}
  GetSubServices() {
    this.sharedservices.GetDetails("Services/GetSubServices/"+this.objeveluation.serviceId).subscribe(rtnData => {
      debugger;
      console.log('rtnData_subservices', rtnData);
      if (rtnData.haserror == false) {
        this.lstsubservices = rtnData.result;
      } else {
        this.toastr.success('error!', 'some Error Occured!');
      }
    });
  }

  ////Multipart section
  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    debugger;
    this.onSubmit();
  }

  onSubmit() {
    const payload = new FormData();
    var token = sessionStorage.getItem("token");
    
    payload.append('Userid', this.userid);
    payload.append('file', this.selectedFile, this.selectedFile.name);
    payload.append('Authtoken','' + token);
    console.log(token)
    this.http
      .post(this.baseURL + "Upload/uploadvaluationimage",
        payload, { 
          headers: { 'encType': "multipart/form-data"}
        }
      ).subscribe((data: any) => {
        this.resData = data;
        console.log(this.resData);
        debugger;
        this.objeveluation.videopath = this.resData.imagePath;
      });
  } 
  ////Multipart section
  onFileSelected_video(event:any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    debugger;
    this.onSubmit_video();
  }

  onSubmit_video() {
    const payload = new FormData();
    var token = sessionStorage.getItem("token");
    
    payload.append('Userid', this.userid);
    payload.append('file', this.selectedFile, this.selectedFile.name);
    payload.append('Authtoken','' + token);
    console.log(token)
    this.http
      .post(this.baseURL + "Upload/uploadvaluationvideo",
        payload, { 
          headers: { 'encType': "multipart/form-data"}
        }
      ).subscribe((data: any) => {
        this.resData = data;
        console.log(this.resData);
        debugger;
        this.objeveluation.imagepath = this.resData.imagePath;
      });
  }
  
  
 //api/Valuation/AddValuation
 AddValuation(){
  this.objeveluation.customerid =  Number(this.userid);
  this.objeveluation.customerid =  Number(this.userid);
  this.sharedservices.post(this.objeveluation, 'Valuation/AddValuation').subscribe(rtnData => {
    debugger; 
    console.log('rtnData', rtnData);
    if (rtnData.haserror == false) {
      this.toastr.success("Saved Succesfully");

    }   
  });
 }

}
