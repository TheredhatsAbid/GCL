import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-tech-side-menu',
  templateUrl: './tech-side-menu.component.html',
  styleUrls: ['./tech-side-menu.component.css']
})
export class TechSideMenuComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }


  navbarCollapsed = false;
  showMenu = false;

toggleNavbarCollapsing() {
 debugger;
 

  setTimeout(() => {
    this.navbarCollapsed = !this.navbarCollapsed;
    this.showMenu != this.showMenu;
  }, 1000);
    
}
}
