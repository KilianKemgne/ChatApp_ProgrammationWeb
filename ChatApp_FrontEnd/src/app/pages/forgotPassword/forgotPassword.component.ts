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
  serverErrorMessages: boolean;
  phoneNumberRegex = /^6[0-9]{8}$/
  ngOnInit() {
    
  }

  onSubmit(form : NgForm){
    this.userService.forgotPassword(form.value).subscribe(
      res => {
        if(Object.keys(res).length == 0){
          console.log('Utilisateur inexistant', res)
          this.serverErrorMessages = true;
        }
        else{
          console.log(res)
          this.showSucessMessage = 'The code has been send to your phone number please verify it';
          this.router.navigateByUrl('/verifyCode');
        }
        // here, we have to send the verify code to the user
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = true;
        }
        else
          this.serverErrorMessages = true;
      }
    )
  }

}
