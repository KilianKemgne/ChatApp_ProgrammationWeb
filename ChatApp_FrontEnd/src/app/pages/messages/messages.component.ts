import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { messageService } from 'src/app/shared/message/message.service';
import { ContactService } from 'src/app/shared/contact.service';


declare interface TableData {
  headerRow: string[];
  dataRows;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages;
  name;
  contact;

  constructor(private userService: UserService,private contactService : ContactService, private messageService :messageService,  private router: Router) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn())
      this.router.navigateByUrl('/login');
  

    this.messageService.getSMS().subscribe(
      res => {
        this.messages = res;
         
        console.log(this.messages);
      },
      err => {
        alert('An error occured !');
      }
    );
    /*this.contactService.getContact(this.messages.idcontact).subscribe(
        res =>{
          this.contact=res;
          console.log(this.contact);

        }
    );*/

  }

  onLogout(){
    
  }
  
}
