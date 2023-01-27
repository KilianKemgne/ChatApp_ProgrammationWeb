import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { updateUser } from 'src/app/shared/updateUserPassword.model';
import {Router} from "@angular/router"
import { UserService } from 'src/app/shared/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-newPassword',
  templateUrl: './newPassword.component.html',
  styleUrls: ['./newPassword.component.scss']
})
export class NewPasswordComponent implements OnInit{

  updateUser : FormGroup;
  constructor(public userService: UserService,private router : Router, private formBuilder : FormBuilder) {
    this.userDetails = JSON.parse(localStorage.getItem('connectedUser'));
    this.updateUser = formBuilder.group({
      id: this.userDetails.id,
      userName: this.userDetails.username,
      emailAddress: this.userDetails.emailaddress,
      phoneNumber: this.userDetails.phonenumber,
      newPassword:''
    })
   }
  updateProfile: updateUser;
  userDetails;

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('connectedUser'));
    
  }

  onSubmit(){
    const contact = (this.updateUser.value.idcontact).split(",");
     this.updateUser.value.idcontact = contact;
     console.log(this.updateUser.value);
    this.userService.newUserPassword(this.updateUser.value).subscribe(
      res => {
        alert('Votre nouveau mot de passe vous a ete envoye par mail')
        this.router.navigateByUrl('/login')
      },
      err => {
        alert('An error occured !')
      }
    );

  }

}
