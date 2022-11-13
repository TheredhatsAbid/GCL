// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiConn: 'https://api-dev.gemcarelab.co.uk/api/',
  apiAccessKey: 'R2VtQ2EuQFBJLnZAMS5WMSqy/ghUeS/2BPvIjbMdyFQ=',
  stripeKey:'pk_test_51L3ilADdrXVqYEPbQh7Bv4zHRrt6zWC5CbvNm3rzseZvIIkvjmoSIbs3JZiCRWmHE6o57PTD8Ea9fEAIdZqAgnX100BF1laZpF',
  returnurl: "http://localhost:4200/#/customer/generateBooking",
  cancelurl:"http://localhost:4200/#/customer/generateBooking",
  dev_returnurl: "https://app-dev.gemcarelab.co.uk/#/customer/generateBooking",
  dev_cancelurl:"https://app-dev.gemcarelab.co.uk/#/customer/generateBooking"
};

// old_apiConn: 'http://185.173.34.168:81/api/',
// returnurl: "http://localhost:4200/#/customer/generateBooking",
// cancelurl:"http://localhost:4200/#/customer/generateBooking"

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
