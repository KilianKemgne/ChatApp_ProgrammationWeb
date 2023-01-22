import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    userName: '',
    emailAddress: '',
    phoneNumber: '',
    password: '',
  };

  constructor(private http: HttpClient) { } 

  postUser(user: User){
    return this.http.post('/register',user);
  }

  login(authCredentials) {
    return this.http.post('/authenticate', authCredentials);
  }

  getUserProfile() {
    return this.http.get('/userProfile');
  } 

  isLoggedIn() {
      return false;
  }

  forgotPassword(phoneNumber) {
    return this.http.post('/forgotPassword', phoneNumber)
  }
}
