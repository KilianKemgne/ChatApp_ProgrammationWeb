import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  // login(authCredentials) {
  //   // avec environment.apiBaseUrl = 'http://127.0.0.1:5000'
  //   return this.http.post(environment.apiBaseUrl+'/connexion', authCredentials);
  // }

  login(authCredentials): Observable<any> {
    const headers = {'content-type': 'application/json'}  
    // const body=JSON.stringify(authCredentials);
    const body = authCredentials;
    console.log(body)
    return this.http.post(environment.apiBaseUrl+'/connexion', body,{'headers':headers})
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

  verifyCode(code) {
    return this.http.post('/verifyCode', code)
  }
}
