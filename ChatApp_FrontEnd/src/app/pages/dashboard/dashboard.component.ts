import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

declare interface TableData {
  headerRow: string[];
  dataRows;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn())
      this.router.navigateByUrl('/login');
  }

  

  onLogout(){
    
  }
  
}
