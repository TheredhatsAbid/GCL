export class AllClasses {
}
export class AppointmentResponse {
    id: number;
    customername: string;
    servicename: string;
    technicianname: string;
    iscompleted: boolean;
    iscancelled: boolean;

    /**
     *
     */
    constructor() {
        this.id = 0;
        this.customername = "";
        this.servicename = "";
        this.technicianname = "";
        this.iscompleted = false;
        this.iscancelled = false;
    }
}

export class BookingReviewResponse {
    id: number;
    customername: string;
    servicename: string;
    technicianname: string;
    points: number;
    comments: string;
    select: boolean;

    /**
     *
     */
    constructor() {
        this.id = 0;
        this.customername = "";
        this.servicename = "";
        this.technicianname = "";
        this.points = 0;
        this.comments = "";
        this.select = false;
    }
}
export class BookingResponse {
    bookingid: number;

    /**
     *
     */
    constructor() {
        this.bookingid = 0;

    }
}

export class AddBookingResponse {
    email: string;
    name: string;
    userid: number;
    serviceid: number;
    address: string;
    workdescription: string;
    requireddate: string;

    /**
     *
     */
    constructor() {
        this.email = "";
        this.name = "";
        this.userid = 0;
        this.serviceid = 0;
        this.address = "";
        this.workdescription = "";
        this.requireddate = "";
    }
}
export class UserBookingResponse {
    customername: string;
    servicename: string;
    email: string;
    mobilenumber: string;
    postalcode: string;
    address: string;
    workdescription: string;
    createdon: string;
    requireddate: string | null;
    expecteddate: string | null;
    userid: number;
    paidamount: number;
    imagepath: string;


    /**
     *
     */
    constructor() {
        this.customername = "";
        this.servicename = "";
        this.email = "";
        this.mobilenumber = "";
        this.postalcode = "";
        this.address = "";
        this.workdescription = "";
        this.createdon = "";
        this.requireddate = "";
        this.expecteddate = "";
        this.userid = 0;
        this.paidamount = 0;
        this.imagepath = "";
    }
}
export class CapturePaymentResponse {
    transactionid: string;
    chargeid: string;

    /**
     *
     */
    constructor() {
        this.transactionid = "";
        this.chargeid = "";
    }
}

export class addBookingRequest {
    serviceid: number;
    userid: number
    address: string;
    name: string;
    email: string;
    postalcode: string;
    mobilenumber: string;
    workdescription: string;
    requireddate: Date;
    imagespath: string[];
    addressnotes: string;

    /**
     *
     */
    constructor() {
        this.serviceid = 0;
        this.userid = 0
        this.address = "";
        this.name = "";
        this.email = "";
        this.postalcode = "";
        this.mobilenumber = "";
        this.workdescription = "";
        this.requireddate = new Date();
        this.imagespath = [];
        this.addressnotes= "";
    }
}

export class JobsSummaryResponse_Graph {
    unallocatedjobs: number;
    allocatedjobs: number;
    cancelledjobs: number;
    completedjobs: number;
    name:string
    /**
     *
     */
    constructor() {
        this.name ="";
        this.unallocatedjobs = 0;
        this.allocatedjobs = 0;
        this.cancelledjobs = 0;
        this.completedjobs = 0;
    }
}

export class JobsSummaryResponse {
    unallocatedjobs: number;
    allocatedjobs: number;
    cancelledjobs: number;
    completedjobs: number;

    /**
     *
     */
    constructor() {
        this.unallocatedjobs = 0;
        this.allocatedjobs = 0;
        this.cancelledjobs = 0;
        this.completedjobs = 0;
    }
}
export class DashboardAllJobsResponse {
    name: string;
    summary: JobsSummaryResponse;

    /**
     *
     */
    constructor() {
        this.name = "";
        this.summary = new JobsSummaryResponse();
    }
}
export class TechnicianResponse {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    mobile: string;
    select: boolean

    /**
     *
     */
    constructor() {
        this.id = 0;
        this.email = "";
        this.firstname = "";
        this.lastname = "";
        this.mobile = "";
        this.select = false;
    }
}
export class PayPalAuthenticationResponse {
    scope: string;
    access_token: string;
    token_type: string;
    app_id: string;
    expires_in: number;
    nonce: string;

    /**
     *
     */
    constructor() {
        this.scope = '';
        this.access_token = '';
        this.token_type = '';
        this.app_id = '';
        this.expires_in = 0;
        this.nonce = '';
    }
}


export class TokenValidationResponse {
    isvalid: boolean;
    isexpired: boolean;

    /**
     *
     */
    constructor() {
        this.isvalid = false;
        this.isexpired = false;
    }
}

export class RefreshTokenResponse {
    authtoken: string;
    refreshtoken: string;

    /**
     *
     */
    constructor() {
        this.authtoken = "";
        this.refreshtoken = "";
    }
}
export class ServiceResponse {
    id: number;
    name: string;
    shortDescription: string;
    description: string;
    imageUrl: string;
    price: number;

    /**
     *
     */
    constructor() {
        this.id = 0;
        this.name = "";
        this.shortDescription = "";
        this.description = "";
        this.imageUrl = "";
        this.price = 0;
    }
}
export class AllServicesResponse {
    id: number;
    name: string;
    imageUrl: string;
    price: number;

    /**
     *
     */
    constructor() {
        this.id = 0;
        this.name = "";
        this.imageUrl = "";
        this.price = 0;
    }
}
export class SignInResponse {
    userid: number;
    email: string;
    firstname: string;
    lastname: string;
    authtoken: string;
    refreshtoken: string;
    imagepath: string;
    smsotp: number;
    emailcode: number;

    /**
     *
     */
    constructor() {
        this.userid = 0;
        this.email = "";
        this.firstname = "";
        this.lastname = "";
        this.authtoken = "";
        this.refreshtoken = "";
        this.imagepath = "";
        this.smsotp = 0;
        this.emailcode = 0;
    }
}

export class AdminSignInResponse {
    userid: number;
    email: string;
    firstname: string;
    lastname: string;
    authtoken: string;
    refreshtoken: string;
    imagepath: string;

    /**
     *
     */
    constructor() {
        this.userid = 0;
        this.email = "";
        this.firstname = "";
        this.lastname = "";
        this.authtoken = "";
        this.refreshtoken = "";
        this.imagepath = "";
    }
}

export class SliderResponse {
    imageurl: string;
    shortdescription: string;

    /**
     *
     */
    constructor() {
        this.imageurl = "";
        this.shortdescription = "";

    }
}

export class UserProfileResponse {
    id: number;
    firstname: string;
    lastname: string;
    dateofbirth: string;
    gender: string;
    mobile: string;
    email: string;
    imagepath: string;

    /**
     *
     */
    constructor() {
        this.id = 0;
        this.firstname = "";
        this.lastname = "";
        this.dateofbirth = "";
        this.gender = "";
        this.mobile = "";
        this.email = "";
        this.imagepath = "";
    }
}

export class login {
    email: string;
    mobile: string
    password: string

    /**
     *
     */
    constructor() {
        this.email = "";;
        this.mobile = "";
        this.password = "";

    }
}


export class capturePayment {
    authtoken: string;
    bookingid: number;
    paymentmethodid: string;
    amount: number;
    currency: string;
    useremail: string;

    /**
     *
     */
    constructor() {
        this.authtoken = "";
        this.bookingid = 0;
        this.paymentmethodid = "";
        this.amount = 0;
        this.currency = "";;
        this.useremail = "";;
    }
}

export class savePayment {
    authtoken: string;
    bookingid: number;
    paymentmethodid: string;
    amount: string;
    customerid: string;
    transactionid: string;
    chargeid: string;
    numberofweek: number;

    /**
     *
     */
    constructor() {
        this.authtoken = ""
        this.bookingid = 0;
        this.paymentmethodid = ""
        this.amount = ""
        this.customerid = ""
        this.transactionid = ""
        this.chargeid = ""
        this.numberofweek = 0;
    }
}

export class getAll {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
    shortdescription:string

    /**
     *
     */
    constructor() {
        this.id = 0;
        this.imageUrl = ""
        this.name = "";
        this.price = 0;
        this.shortdescription= "";
    }
}


export class adminJobmodal {
    customername: string;
    id: number
    iscancelled: boolean;
    iscompleted: boolean
    servicename: string;
    technicianname: string;

    /**
     *
     */
    constructor() {
        this.customername = ""
        this.id = 0;
        this.iscancelled = false;
        this.iscompleted = false
        this.servicename = ""
        this.technicianname = ""
    }
}


export class techDetails {
    email: string;
    firstname: string;
    id: number
    lastname: string;
    mobile: string;


    /**
     *
     */
    constructor() {
        this.email = '';
        this.firstname = '';
        this.id = 0;
        this.lastname = '';
        this.mobile = '';

    }
}

export class BookingsforTech {
    address: string;
    bookingid: number
    createdon: string;
    customername: string;
    email: string;
    expecteddate: string;
    imagepath: string;
    mobilenumber: string;
    paidamount: number
    postalcode: string;
    requireddate: string;
    servicename: string;
    userid: number
    workdescription: string;
    feedback: string;

    /**
     *
     */
    constructor() {
        this.address = ""
        this.bookingid = 0;
        this.createdon = ""
        this.customername = ""
        this.email = ""
        this.expecteddate = "";
        this.imagepath = "";
        this.mobilenumber = "";
        this.paidamount = 0
        this.postalcode = ""
        this.requireddate = "";
        this.servicename = "";
        this.userid = 0
        this.workdescription = "";
        this.feedback = "";
    }
}



export class subservices {
    description: string;
    id: number;
    imageUrl: string;
    name: string;
    price: number;
    shortDescription: string;

    /**
     *
     */
    constructor() {
        this.description = "";
        this.id = 0;
        this.imageUrl = "";
        this.name = "";
        this.price = 0;
        this.shortDescription = "";
    }
}


export class paypalcls{
  bookingId: number;
  amount: number;
  currencycode: string;
  returnurl: string;
  cancelurl : string;

  /**
   *
   */
  constructor() {
    this.bookingId =0;
    this.amount =0 ;
    this.currencycode ="";
    this.returnurl ="";
    this.cancelurl ="";
  
      
  }
}



export class PayPalCapturePayment{
    orderid : string;
    token : string;
    payerid : string;
    payPalrequestid : string;

    /**
     *
     */
    constructor() {
        this.orderid = "";
        this.token = "";
        this.payerid = "";
        this.payPalrequestid = "";
    }
  }




////////////////////yesyeyesy

export class Amount {
    currency_code: string;
    value: string;
    breakdown: Breakdown;

    /**
     *
     */
    constructor() {
        this.currency_code ="";
        this.value =""
        this.breakdown = new Breakdown();
    }
}

export class Breakdown {
    item_total: ItemTotal;

    /**
     *
     */
    constructor() {
        this.item_total = new  ItemTotal();
    }
}

export class Item {
    name: string;
    unit_amount: UnitAmount;
    quantity: string;
    description: string;

    /**
     *
     */
    constructor() {
        this.name="";;
        this.unit_amount = new  UnitAmount();
        this.quantity="";;
        this.description="";
    }
}

export class ItemTotal {
    currency_code: string;
    value: string;

    /**
     *
     */
    constructor() {
        this.currency_code = "";
        this.value = "";
    }
}

export class Link {
    href: string;
    rel: string;
    method: string;

    /**
     *
     */
    constructor() {
        this.href = "";
        this.rel = "";
        this.method = "";
    }
}

export class Payee {
    email_address: string;
    merchant_id: string;

    /**
     *
     */
    constructor() {
        this.email_address = "";
        this.merchant_id = "";
    }
}

export class PurchaseUnit {
    reference_id: string;
    amount: Amount;
    payee: Payee;
    items: Item[];

    /**
     *
     */
    constructor() {
        this.reference_id = "";
        this.amount = new   Amount();
        this.payee =  new Payee();
        this.items =  [];
    }
}

export class Result {
    id: string;
    intent: string;
    status: string;
    payPalRequestId: string;
    processing_instruction: string;
    purchase_units: PurchaseUnit[];
    create_time: string;
    links: Link[];

    /**
     *
     */
    constructor() {
        this.id = ""
        this.intent = ""
        this.status = ""
        this.payPalRequestId = ""
        this.processing_instruction = ""
        this.purchase_units = [];
        this.create_time = ""
        this.links = [];
    }
}

export class Root {
    statuscode: number;
    message: string;
    haserror: boolean;
    result: Result;

    /**
     *
     */
    constructor() {
        this.statuscode = 0;
        this.message = "";
        this.haserror = false;
        this.result = new Result;
    }
}

export class UnitAmount {
    currency_code: string;
    value: string;

    /**
     *
     */
    constructor() {
        this.currency_code ="";
        this.value ="";
    }
}

export class MarkBookingcomplete{
    
        bookingid: number;
        technicianid: number;
        feedback : string

        /**
         *
         */
        constructor() {
            this.bookingid =0;
            this.technicianid =0;
            this.feedback =""
        }
    }



    export class eveluation{
        customerid : number;
        technicianid : number;
        serviceId : number;
        itemdescription : string;
        imagepath : string;
        videopath : string;
        quotation : number;


        /**
         *
         */
        constructor() {
            this.customerid  = 0;
            this.technicianid  = 0;
            this.serviceId  = 0;
            this.itemdescription  = "";
            this.imagepath  = "";
            this.videopath  = "";
            this.quotation  = 0;
        }
      }