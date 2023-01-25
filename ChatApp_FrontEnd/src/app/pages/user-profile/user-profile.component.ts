import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { updateUser } from 'src/app/shared/updateUser.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userDetails;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  updateProfile:updateUser;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phoneNumberRegex = /^6[0-9]{8}$/;

  constructor(public userService: UserService,private router : Router) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('connectedUser'));
    this.updateProfile = {
      id: this.userDetails.id,
      userName: this.userDetails.username,
      emailAddress: this.userDetails.emailaddress,
      phoneNumber: this.userDetails.phonenumber,
    }
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    localStorage.setItem('connectedUser', form.value)
    
    this.userService.updateUser(form.value).subscribe(
      res => {
        console.log(res)
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        //alert("Modifications éffectuées !!")
        this.router.navigate(['/update-profile']);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
          console.log(err);
          
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
          console.log(err);
          
      }
    );
  }

  
}
