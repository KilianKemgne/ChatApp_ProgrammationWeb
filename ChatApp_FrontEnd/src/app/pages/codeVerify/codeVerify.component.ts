import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './codeVerify.component.html',
  styleUrls: ['./codeVerify.component.scss']
})
export class CodeVerifyComponent implements OnInit {

  constructor(public userService: UserService,private router : Router) { }
  
  ngOnInit() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index1) => {
      input.addEventListener("keyup", (e) => {
        const currentInput = input,
          nextInput : any = input.nextElementSibling,
          prevInput : any = input.previousElementSibling;

        if (currentInput.value.length > 1) {
          currentInput.value = "";
          return;
        }

        if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
          nextInput.removeAttribute("disabled");
          nextInput.focus();
        }

        if (e.key === "Backspace") {
          inputs.forEach((input, index2) => {
            if (index1 <= index2 && prevInput && input !== inputs.item(4)) {
              input.setAttribute("disabled", 'true');
              input.value = "";
              prevInput.focus();
            }
          });
        }

        if (!inputs[3].disabled && inputs[3].value !== "") {
          inputs.item(inputs.length-1).classList.add("active");
          return;
        }
        inputs.item(inputs.length-1).classList.remove("active");
      });
    });
      window.addEventListener("load", () => inputs[0].focus());
    
  }

  onSubmit(form : NgForm){
    console.log(form.value);
    this.userService.verifyCode(form.value).subscribe(
      res => {
        // this.showSucessMessage = true;
        // setTimeout(() => this.showSucessMessage = false, 4000);
        // this.resetForm(form);
        // this.router.navigateByUrl('/login');
        console.log(res);
        
      },
      err => {
        if (err.status === 422) {
          console.log(err);
          //this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          console.log(err);
          //this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }
  
}
