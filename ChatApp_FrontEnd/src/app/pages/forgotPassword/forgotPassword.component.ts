import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router"
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  constructor(public userService: UserService,private router : Router) { }
  showSucessMessage: string;
  serverErrorMessages: string;
  phoneNumberRegex = /^6[0-9]{8}$/
  ngOnInit() {
    
  }

  onSubmit(form : NgForm){
    this.userService.forgotPassword(form.value).subscribe(
      res => {
        this.showSucessMessage = 'The code has been send to your phone number please verify it';
        this.router.navigateByUrl('/verifyCode');
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    )
  }

}
