import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',       title: 'Dashboard',         icon: 'ni-tv-2 text-success',       class: '',},
    { path: '/newContact',       title: 'New Contact',         icon: 'fa-regular fa-address-book text-success',       class: '',},
    { path: '/importContact',       title: 'Import Contact',         icon: 'fa-solid fa-id-badge text-success',       class: '',},
    { path: '/contacts',       title: 'Contacts',         icon: 'fa-solid fa-address-card text-success',       class: '',},
    { path: '/sendMessage',       title: 'New Message',         icon: 'fa-solid fa-message text-success',       class: '',},
    { path: '/messages',       title: 'Messages',         icon: 'fa-regular fa-message-lines text-success',       class: '',},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}