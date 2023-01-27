import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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

  constructor(private messageService: messageService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    this.messageService.createSMS(form.value).subscribe(
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
