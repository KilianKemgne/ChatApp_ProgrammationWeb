import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router"
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(private userService: UserService, private router: Router) { }

  model = {
    userName :'',
    password:''
  };
  serverErrorMessages: boolean;
  ngOnInit() {
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/dashboard');
  }

  onSubmit(form : NgForm){
    console.log("Tentative de connexion", form.value) // on verifie le contenu du formulaire
    this.userService.login(form.value).subscribe(
      res => {
        if(Object.keys(res).length == 0){
          console.log('Utilisateur inexistant', res)
          this.serverErrorMessages = true
        }
        else{
          console.log('Utilisateur OK', res)
          this.router.navigateByUrl('/dashboard');
        }
      },
      err => {
        // this.serverErrorMessages = err.error.message;
        this.serverErrorMessages = true;
      }
    );
  }

}
