import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { IPayPalConfig, ICreateOrderRequest, ICreateSubscriptionRequest } from 'ngx-paypal';
import { ToastrService } from 'ngx-toastr';
import { addBookingRequest, capturePayment, CapturePaymentResponse, getAll, PayPalCapturePayment, paypalcls, Result, savePayment, subservices, UserBookingResponse } from 'src/app/Classes/all-classes';
import { CheckoutService } from 'src/app/Global/checkout.service';
import { GlobalService } from 'src/app/Global/global.service';
import { SharedService } from 'src/app/Shared/shared.service';
// import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [DatePipe]
})
export class BookingComponent implements OnInit {
  registrationForm = this.fb.group({
    file: [null]
  })

  baseURL : string ="";
  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;
  selectdAmount: number = 0;
  selectedID: any = "";
  stripeKey: string = "";
  returnurl: string = "";
  cancelurl: string = "";


  stripeID: string = "";
  paymentHandler: any = null;
  BookingID: string = "";
  envData;
  objsavePayment: savePayment;
  objcapturePayment: capturePayment;
  objCapturePaymentResponse: CapturePaymentResponse;
  UserBookingResponse: UserBookingResponse;
  addBookingRequest: addBookingRequest;
  userid: string = "";
  serviceid: string = "";
  servicename: string = "";
  myDate = new Date();
  urlSafe: any

  PayPalCapturePayment:PayPalCapturePayment;
  /////Paypal////
  public payPalConfig?: IPayPalConfig;
  public showPaypalButtons: boolean = false;
  objpaymentMethodID: paymentMethodID;
  paymentmethodid: string = "";
  objgetAll: getAll;
  lstsubservices : subservices[];
  paypalcls:paypalcls;
  Result:Result;

  addresses:string[];

  title = 'ng-bootstrap-modal-demo';
  closeResult: string = "";
  modalOptions: NgbModalOptions;
  /////end Paypal ////

  // name = 'Angular';
  image: File | undefined;
  resData: any;
  selectedFile :any;

  constructor(
    private sharedservices: SharedService,
    private toastr: ToastrService,
    public fb: FormBuilder,
    private Global: GlobalService,
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe,
    private checkout: CheckoutService,
    private modalService: NgbModal,
    public sanitizer: DomSanitizer,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
    
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg'
    }
    this.PayPalCapturePayment= new PayPalCapturePayment();
    this.UserBookingResponse = new UserBookingResponse();
    this.objsavePayment = new savePayment();
    this.objcapturePayment = new capturePayment();
    this.objCapturePaymentResponse = new CapturePaymentResponse();
    this.envData = environment;
    this.stripeKey = this.envData.stripeKey;
    this.returnurl = this.envData.returnurl;
    this.cancelurl = this.envData.cancelurl;

    this.addBookingRequest = new addBookingRequest();
    this.objpaymentMethodID = new paymentMethodID();
    this.objgetAll = new getAll();
    this.lstsubservices = [];
    this.paypalcls = new paypalcls();
    this.Result = new Result();
    this.addresses = [];
    this.baseURL = this.envData.apiConn;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      debugger;
      console.log(params);
      if(params!= null ){

      this.PayPalCapturePayment.payerid = params['PayerID']
      this.PayPalCapturePayment.token = params['token']
      if(this.PayPalCapturePayment.payerid != undefined  )
      this.PayPal_CapturePayment();
      }
    });

  }
  sub: any;
  ngOnInit(): void {
    debugger;
    this.invokeStripe();
    this.PayPalConfig()

    this.objgetAll = this.sharedservices.objgetAll;
    if (this.Global.isStringNullOrEmpty(this.objgetAll.name)) {
      //  this.sharedservices.Redirect('customer/dashboard');
    }
    else {
      this.serviceid = this.objgetAll.id.toString();
      this.servicename = this.objgetAll.name.toString();
      this.selectdAmount = this.objgetAll.price;

      this.GetSubServices();
    }


    var uid = sessionStorage.getItem("userid");
    this.userid = this.Global.convertToString(uid);

  }


  postalcodeaddresses(){
    //api/Address/postalcodeaddresses
    this.sharedservices.get_noPagination(this.addBookingRequest.postalcode,"postalcode","Address/postalcodeaddresses").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        this.addresses = rtnData.result.addresses; 
      }
    })


  }
  ///////Paypal

  //api/PayPal/CreateOrder

  CreateOrder(content: any){
    console.log("save");
    console.log(this.UserBookingResponse);
    debugger;
    this.addBookingRequest.userid = Number(this.userid);
    this.addBookingRequest.serviceid = Number(this.serviceid);
    this.addBookingRequest.requireddate = new Date(this.Global.convertToString(this.datePipe.transform(this.myDate, 'yyyy-MM-dd HH:MM')));
    this.sharedservices.post(this.addBookingRequest, 'Booking/AddBooking').subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        this.toastr.success("Booking generated succesfully");
        this.BookingID = rtnData.result.bookingid;
        this.openPaypal_APIInterface(content);
      }   
    });
  }

  openPaypal_APIInterface(content:any ){
    this.paypalcls.bookingId = Number(this.BookingID);
    this.paypalcls.amount = this.selectdAmount;
    this.paypalcls.currencycode = "GBP";
    this.paypalcls.returnurl = this.returnurl;
    this.paypalcls.cancelurl = this.cancelurl;
    this.sharedservices.post(this.paypalcls, 'PayPal/CreateOrder').subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        this.toastr.success("CreateOrder");
        this.Result  = rtnData.result;
        debugger;
        console.log("test")
        console.log(this.Result.links[1].href)
        sessionStorage.setItem('id',this.Result.id);
        sessionStorage.setItem('payPalRequestId',this.Result.payPalRequestId);
        // teststes
      //  this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.Result.links[1].href);
      window.open(this.Result.links[1].href,"_self")
        debugger;
      } else {
        this.toastr.error('error!', 'some Error Occured!');
      }
    });
  }

  PayPal_CapturePayment(){
  var id=  sessionStorage.getItem('id');
  var payPalRequestId =  sessionStorage.getItem('payPalRequestId');
    this.PayPalCapturePayment.orderid = ""+id;
    this.PayPalCapturePayment.payPalrequestid = ""+payPalRequestId?.toString();;
    this.sharedservices.post(this.PayPalCapturePayment, 'PayPal/CapturePayment').subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        debugger;
        this.toastr.success("Payment Captured succesfully");
        debugger;
        this.sharedservices.Redirect('customer/dashboard');
       // this.SavePayment(rtnData.result.chargeid, rtnData.result.transactionid);
     
      } else {
        this.toastr.error('error!', 'some Error Occured!');
      }
    });
  }
  
  PayPalConfig() {

    this.payPalConfig = {
      currency: "GBP",
      clientId: "Adz_mjQ2asM_DbdFDeeoxNOs7vFketj2zWSOLFMcTPDLRlo2E9uT-T_J3ibuwOo2G_IbsJkXsBJi-f72",
      
      createOrderOnClient: data => <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "GBP",
                value: this.selectdAmount.toString(),
                breakdown: {
                  item_total: {
                    currency_code: "GBP",
                    value: this.selectdAmount.toString()
                  }
                }
              },
              items: [
                {
                  name: "Enterprise Subscription",
                  quantity: "1",
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: "GBP",
                    value: this.selectdAmount.toString()
                  }
                }
              ]
            }
          ]
        },
      advanced: {
        commit: "true"
      },
      style: {
        label: "paypal",
        layout: "vertical"
      },

      
      onApprove: (data, actions) => {
        console.log( "onApprove - transaction was approved, but not authorized", data, actions );
        actions.order.get().then(() => {
          debugger;
          console.log(
            "onApprove - you can get full order details inside onApprove: ",

          );
        });
      },
      onClientAuthorization: data => {
        debugger;
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
      },
      onError: err => {
        console.log("OnError", err);
      },
      onClick: (data, actions) => {
        console.log("onClick", data, actions);
      }
    };
  }

  pay() {
    this.showPaypalButtons = true;
  }

  back() {
    this.showPaypalButtons = false;
  }


  //////////////////end PayPal
  // /api/Payment/createpaymentmethodid
  createpaymentmethod() {
    debugger;
    this.sharedservices.post(this.objpaymentMethodID, 'Payment/createpaymentmethodid').subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        this.toastr.success("Creat Paymentmethod succesfully");
        this.paymentmethodid = rtnData.result.paymentmethodid;
        this.BookNow();
      } else {
        this.toastr.error('error!', 'some Error Occured!');
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
    // payload.append('name', this.name);
    var token = sessionStorage.getItem("token");
    payload.append('Userid', this.userid);
    // alert(this.userid);
    payload.append('bookingimages', this.selectedFile, this.selectedFile.name);
    payload.append('Authtoken','' + token);
    console.log(token)
    this.http
      .post(this.baseURL + "Upload/uploadmultiplebookingimages",
        payload, { 
          headers: { 'encType': "multipart/form-data"}
        }
      ).subscribe((data: any) => {
        this.resData = data;
        console.log(this.resData);
        debugger;
        this.addBookingRequest.imagespath = data.imagesPath

        console.log(this.addBookingRequest); 
      });
  }

  ///Multipart Section
  BookNow() {
    console.log("save");
    console.log(this.UserBookingResponse);
    debugger;
    this.addBookingRequest.userid = Number(this.userid);
    this.addBookingRequest.serviceid = Number(this.serviceid);
    this.addBookingRequest.requireddate = new Date(this.Global.convertToString(this.datePipe.transform(this.myDate, 'yyyy-MM-dd HH:MM')));
    this.sharedservices.post(this.addBookingRequest, 'Booking/AddBooking').subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);
      if (rtnData.haserror == false) {
        this.toastr.success("Booking generated succesfully");
        this.BookingID = rtnData.result.bookingid;


        // incaseof Stripe
        this.capturePayment(rtnData.result.bookingid, this.paymentmethodid)


        // incase of Paypal


      } else {
        this.toastr.error('error!', 'some Error Occured!');
      }
    });
  }

  capturePayment(BookingID: any, stripeID: any) {
    var token = sessionStorage.getItem("token");
    var loginEmail = sessionStorage.getItem("email")
    this.objcapturePayment.bookingid = BookingID;
    this.objcapturePayment.paymentmethodid = this.paymentmethodid;
    this.objcapturePayment.amount = this.selectdAmount;
    this.objcapturePayment.currency = "usd";
    this.objcapturePayment.useremail = loginEmail!;

    this.sharedservices.post(this.objcapturePayment, "Payment/capturepayment").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.message == "Success" || rtnData.message == "success") {
        this.toastr.success("Payment Captured succesfully");
        this.SavePayment(rtnData.result.chargeid, rtnData.result.transactionid);
      } else {
        this.toastr.error(rtnData.message);
      }
    });
  }
  SavePayment(chargeid: any, transactionid: any) {
    var token = sessionStorage.getItem("token");
    var loginEmail = sessionStorage.getItem("loginEmail")

    this.objsavePayment.chargeid = chargeid;
    this.objsavePayment.transactionid = transactionid;
    this.objsavePayment.customerid = '';
    this.objsavePayment.bookingid = this.objcapturePayment.bookingid;
    this.objsavePayment.amount = this.selectdAmount.toString();
    this.objsavePayment.paymentmethodid = this.paymentmethodid;
    this.sharedservices.post(this.objsavePayment, "Payment/savepayment").subscribe(rtnData => {
      debugger;
      console.log('rtnData', rtnData);

      if (rtnData.haserror == false) {
        this.toastr.success("Payment Saved");
        this.toastr.success("Successfully saved");
        this.sharedservices.Redirect('customer/dashboard');
      } else {
        this.toastr.error(rtnData.message);
      }
    });
  }

  GetSubServices() {

    this.sharedservices.GetDetails("Services/GetSubServices/"+this.serviceid).subscribe(rtnData => {
      debugger;
      console.log('rtnData_subservices', rtnData);
      if (rtnData.haserror == false) {
        this.lstsubservices = rtnData.result;
      } else {
        this.toastr.success('error!', 'some Error Occured!');
      }
    });
  }




  uploadFile(event: any) {
    alert('test1')
    debugger;

    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.addBookingRequest.imagespath = this.imageUrl
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  // Function to remove uploaded file
  removeUploadedFile() {
    alert('test')
    // let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
    });
  }
  //////////////Stripe Section//////////
  triggerModal() {
    this.invokeStripe();
  }
  // paymentHandler:any = null;

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeKey,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }

      window.document.body.appendChild(script);
    }
  }
  closePaymentModel(){
    let element: HTMLElement = document.getElementById('btnPaymentModal') as HTMLElement;
						element.click();
  }
  makePayment(amount: any, id: any) {
    debugger;
    this.closePaymentModel();
    this.selectdAmount = amount;
    this.selectedID = id;
    const paymentHandler = (<any>window).StripeCheckout.configure({


      key: this.stripeKey,
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log(stripeToken)
        this.objpaymentMethodID.stripetoken = stripeToken.id;
        this.createpaymentmethod();
      }
    });
    debugger;

    paymentHandler.open({
      name: 'Stripe',
      description: '2 widgets',
      amount: amount * 100
    }

    );
  }
  //////////////stripe end//////////////
  openPayment(content: any, id: any){
  debugger;
  this.modalService.open(content, this.modalOptions).result.then((result) => {
    debugger;
      
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
  }

  open(content: any, id: any) {
    // this.updateJob.bookingid = Number(id);
    this.closePaymentModel();
    this.CreateOrder(content)
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



export class paymentMethodID {
  stripetoken: string = "";
}
