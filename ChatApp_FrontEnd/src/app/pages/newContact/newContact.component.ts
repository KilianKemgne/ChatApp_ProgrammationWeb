import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

declare interface TableData {
  headerRow: string[];
  dataRows;
}

@Component({
  selector: 'app-newContact',
  templateUrl: './newContact.component.html',
  styleUrls: ['./newContact.component.scss']
})
export class NewContactComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn())
      this.router.navigateByUrl('/login');
  }

  

  onLogout(){
    
  }
  
}
