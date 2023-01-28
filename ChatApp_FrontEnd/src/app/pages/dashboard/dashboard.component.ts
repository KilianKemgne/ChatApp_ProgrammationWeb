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

  number : any;
  ngOnInit() {
    if(!this.userService.isLoggedIn()){
      this.router.navigateByUrl('/login');
    }
    this.userService.numbermessagescontacts({iduser: JSON.parse(localStorage.getItem('connectedUser')).id}).subscribe(
      res => {
          this.number = res;
      },
      err => {
        console.log('An error occured !');
        
      }
    )

  }

}
