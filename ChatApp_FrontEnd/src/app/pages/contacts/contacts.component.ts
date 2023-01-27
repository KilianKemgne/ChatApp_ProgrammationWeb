import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/shared/contact.service';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private contactService: ContactService, private router: Router, private userService : UserService) { }

  contactsList;
  ngOnInit() {
    if(!this.userService.isLoggedIn()){
      this.router.navigateByUrl('/login');
    }
    
    this.contactService.getContacts().subscribe(
      res => {
        this.contactsList = res;
        console.log(res);
        
      },
      err => {
        console.log("Cannot found !")
      }
    )
  }
  
}
