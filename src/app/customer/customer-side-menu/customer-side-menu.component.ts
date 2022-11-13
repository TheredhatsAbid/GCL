import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Shared/shared.service';

@Component({
  selector: 'app-customer-side-menu',
  templateUrl: './customer-side-menu.component.html',
  styleUrls: ['./customer-side-menu.component.css']
})
export class CustomerSideMenuComponent implements OnInit {

  constructor( private sharedservices:SharedService) { }

  ngOnInit(): void {
  }
  setFormName(strL:any){
    
  }
  rout(str: any){
    this.sharedservices.Redirect(str);
  }
}
