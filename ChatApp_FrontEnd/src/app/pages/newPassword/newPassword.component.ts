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

      this.userService.getUserProfile(localStorage.getItem('phonenumber')).subscribe(
      res => { 
        localStorage.setItem('connectedUser', JSON.stringify(res));
        localStorage.removeItem('phonenumber')
      },
      err => {
        console.log('Cannot found !');
      }
    )

    this.userDetails = JSON.parse(localStorage.getItem('connectedUser'));
    this.updateUser = formBuilder.group({
      id: JSON.parse(localStorage.getItem('connectedUser')).id,
      userName: JSON.parse(localStorage.getItem('connectedUser')).username,
      emailAddress: JSON.parse(localStorage.getItem('connectedUser')).emailaddress,
      phoneNumber: JSON.parse(localStorage.getItem('connectedUser')).phonenumber,
      newPassword:''
    })
   }
  updateProfile: updateUser;
  userDetails;

  ngOnInit() {
   
  }

  onSubmit(){
    
    //console.log(this.updateUser.value);
    this.userService.newUserPassword(this.updateUser.value).subscribe(
      res => {
        //localStorage.removeItem('connectedUser')
        this.router.navigateByUrl('/login')
      },
      err => {
        alert('An error occured !')
      }
    );

  }

}
