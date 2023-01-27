import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public focus;
  public listTitles: any[];
  public location: Location;
  userDetails;

  constructor(location: Location,  private element: ElementRef, private router: Router, private userService: UserService) {
    this.location = location;
  }

 
  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    setTimeout(() => {
      this.userDetails = JSON.parse(localStorage.getItem('connectedUser'))
    }, 5);
  }

  onLogout(){
    // on envoi un signal au serveur avant de se deconnecter

    this.userService.logout().subscribe(
      res => {
        console.log('Deconnexion reussie')
        this.userService.deleteUserData();
        this.router.navigate(['/login']);
      },
      err => {
        // this.serverErrorMessages = err.error.message;
        console.log("Impossible de se déconnecter")
      }
    );
  }


  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return '';
  }

}
