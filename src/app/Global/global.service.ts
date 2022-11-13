import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  FormName: string ="";
  constructor() { }


  isStringNullOrEmpty(str: any){
    if(str=="" || str== undefined || str== null){
      return true;
    }
    else {
      return false;
    }
  }

  convertToString(str: any){
    if(str=="" || str== undefined || str== null){
      return "";
    }
    else {
      return str.toString();
    }
  }

  
  isNumberZeroOrEmpty(str: any){
    if(str==0 || str== undefined || str== null){
      return true;
    }
    else {
      return false;
    }
  }

  convertDate(str: any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
}
