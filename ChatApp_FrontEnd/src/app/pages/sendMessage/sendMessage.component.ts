import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';

import { messageService } from 'src/app/shared/message/message.service';


/*declare interface TableData {
  headerRow: string[];
  dataRows;
}
*/


@Component({
  selector: 'app-sendMessage',
  templateUrl: './sendMessage.component.html',
  styleUrls: ['./sendMessage.component.scss']
})
export class SendMessageComponent implements OnInit {

  sendMessage: FormGroup;

  constructor(private messageService: messageService, private router: Router, private formBuilder : FormBuilder) { 
    this.sendMessage = formBuilder.group({
      content: '',
      creationDate: '',
      iduser: JSON.parse(localStorage.getItem('connectedUser')).id,
      idcontact: ''
    })
}
  

  ngOnInit() {
  }

  onSubmit() {
    
     const contact = (this.sendMessage.value.idcontact).split(",");
     this.sendMessage.value.idcontact = contact;
     console.log(this.sendMessage.value);
    this.messageService.createSMS(this.sendMessage.value).subscribe(
      res => {
        alert('SMS saved successfully!')
      },
      err => {
        alert('An error occured !')
      }
    );
  }

  onLogout(){
    
  }
  
}
