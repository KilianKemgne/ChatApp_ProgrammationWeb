import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ContactService } from 'src/app/shared/contact.service';

import { messageService } from 'src/app/shared/message/message.service';

@Component({
  selector: 'app-sendMessage',
  templateUrl: './sendMessage.component.html',
  styleUrls: ['./sendMessage.component.scss']
})
export class SendMessageComponent implements OnInit {

  sendMessage: FormGroup;
  contactsList;
  expanded = false;
  checkboxe;
  idcontact = [];
  namecontact =[];

  constructor(private messageService: messageService, private contactService: ContactService, private router: Router, private formBuilder : FormBuilder) { 
    this.sendMessage = formBuilder.group({
      content: '',
      creationDate: '',
      iduser: JSON.parse(localStorage.getItem('connectedUser')).id,
      idcontact: ''
    })
}
  

  ngOnInit() {
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

  showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!this.expanded) {
      checkboxes.style.display = "block";
      this.expanded = true;
    } else {
      this.idcontact=[];
      this.namecontact=[];
      this.checkboxe = document.querySelectorAll('input[type="checkbox"]:checked');
      for (let checkbox of this.checkboxe) {
        this.idcontact.push(checkbox.id);
        this.namecontact.push(checkbox.name);
      }
      checkboxes.style.display = "none";
      this.expanded = false;
    }
    
  }
  collectValue(){
    let checkboxes = document.getElementById("checkboxes");
    this.idcontact=[];
    this.namecontact=[];
    this.checkboxe = document.querySelectorAll('input[type="checkbox"]:checked');
    for (let checkbox of this.checkboxe) {
        this.idcontact.push(checkbox.id);
        this.namecontact.push(checkbox.name);
    }
    console.log(this.idcontact);
    console.log(this.namecontact);

    checkboxes.style.display = "none";

  }
  
  OnSubmit() {
    
     this.sendMessage.value.idcontact = this.idcontact;
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
