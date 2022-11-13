import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Global/global.service';
import { SharedService } from 'src/app/Shared/shared.service';

@Component({
  selector: 'app-admin-side-menu',
  templateUrl: './admin-side-menu.component.html',
  styleUrls: ['./admin-side-menu.component.css']
})
export class AdminSideMenuComponent implements OnInit {
  FormName: string = "";
  constructor(private router: Router, private GlobalVariableService: GlobalService,
    private sharedservices:SharedService) { }

  ngOnInit(): void {
  }
  setFormName(formName: string) {
    this.GlobalVariableService.FormName = formName;
    this.FormName =  this.GlobalVariableService.FormName;
  }
  route(url: string) {
    var myurl = `${url}/${''}`;
    const that = this;
    that.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      that.router.navigate([myurl])
    );
  }

  navbarCollapsed = false;
  showMenu = false;

toggleNavbarCollapsing() {
 

  setTimeout(() => {
    this.navbarCollapsed = !this.navbarCollapsed;
    this.showMenu != this.showMenu;
  }, 1000);
    
}


}
