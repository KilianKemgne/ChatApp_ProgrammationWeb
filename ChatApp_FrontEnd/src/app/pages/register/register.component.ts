import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: boolean;
  phoneNumberRegex = /^6[0-9]{8}$/

  constructor(public userService: UserService,private router : Router) { }

  ngOnInit() {
    
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    this.userService.postUser(form.value).subscribe(
      res => {
        if(Object.keys(res).length == 0){
          console.log('Utilisateur deja existant', res)
          this.serverErrorMessages = true;
        }
        else{
          console.log('Utilisateur ajoute avec succes', res)
          this.showSucessMessage = true;
          setTimeout(() => this.showSucessMessage = false, 4000);
          alert('Saved successfully')
          this.resetForm(form);
          this.router.navigateByUrl('/login');
        }
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = true;
        }
        else
          this.serverErrorMessages = true;
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      userName: '',
      emailAddress: '',
      phoneNumber: '',
      password: '',
    };
    form.resetForm();
    this.serverErrorMessages = false;
  }
}
