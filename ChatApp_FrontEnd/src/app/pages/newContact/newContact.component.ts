import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/shared/contact.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-newContact',
  templateUrl: './newContact.component.html',
  styleUrls: ['./newContact.component.scss']
})
export class NewContactComponent implements OnInit {

  @Input() contactName:string;

  @Input() contactNumber="";

  isCorrectName=false

  isCorrectNumber=false

  phoneNumberRegex = /^6[0-9]{8}$/
  newContact: FormGroup;

  constructor(private contactService : ContactService, private formBuilder : FormBuilder) { 
      this.newContact = formBuilder.group({
        username: '',
        phonenumber: '',
        iduser: JSON.parse(localStorage.getItem('connectedUser')).id
      })
  }

  userData

  ngOnInit() {
    // this.userData = JSON.parse(localStorage.getItem('connectedUser'))
    // console.log(this.userData.id);
  }

  onSubmit(){
    console.log(this.newContact.value)
    this.contactService.createContact(this.newContact.value).subscribe(
      res => {
        alert('Contact saved successfully!')
      },
      err => {
        alert('An error occured !')
      }
    )
  }

  addNewContact(){
    
  }

  onResetFields(){
    console.log("fields resets")
    this.newContact.reset()
  }

  onLogout(){
    
  }
  
}
