import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

declare interface TableData {
  headerRow: string[];
  dataRows;
}

@Component({
  selector: 'app-sendMessage',
  templateUrl: './sendMessage.component.html',
  styleUrls: ['./sendMessage.component.scss']
})
export class SendMessageComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn())
      this.router.navigateByUrl('/login');
  }

  

  onLogout(){
    
  }
  
}
