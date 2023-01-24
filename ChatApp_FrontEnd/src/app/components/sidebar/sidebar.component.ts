import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from "../navbar/auth.guard";

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    CanActivate
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',       title: 'Dashboard',         icon: 'ni-tv-2 text-success',       class: '',    CanActivate: [AuthGuard]},
    { path: '/newContact',       title: 'New Contact',         icon: 'fa-regular fa-address-book text-success',       class: '',    CanActivate: [AuthGuard]},
    { path: '/importContact',       title: 'Import Contact',         icon: 'fa-solid fa-id-badge text-success',       class: '',    CanActivate: [AuthGuard]},
    { path: '/contacts',       title: 'Contacts',         icon: 'fa-solid fa-address-card text-success',       class: '',   CanActivate: [AuthGuard]},
    { path: '/sendMessage',       title: 'New Message',         icon: 'fa-solid fa-message text-success',       class: '',    CanActivate: [AuthGuard]},
    { path: '/messages',       title: 'Messages',         icon: 'bx bxs-chat text-success',       class: '',    CanActivate: [AuthGuard]},
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