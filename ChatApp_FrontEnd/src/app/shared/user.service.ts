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

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { } 

  postUser(user: User): Observable<any> {
    const headers = {'content-type': 'application/json'}  
    // const body=JSON.stringify(authCredentials);
    const body = user;
    console.log(body)
    return this.http.post(environment.apiBaseUrl+'/inscription', body,{'headers':headers})
  }

  // login(authCredentials) {
  //   // avec environment.apiBaseUrl = 'http://127.0.0.1:5000'
  //   return this.http.post(environment.apiBaseUrl+'/connexion', authCredentials);
  // }

  login(authCredentials): Observable<any> {
    const headers = {'content-type': 'application/json'}  
    const body = authCredentials;
    console.log(body)
    return this.http.post(environment.apiBaseUrl+'/connexion', body,{'headers':headers})
  }

  getUserProfile(id): Observable<any> {
    const headers = {'content-type': 'application/json'}  
    const body = id;
    console.log(body)
    return this.http.post(environment.apiBaseUrl+'/userprofile', body,{'headers':headers})
  } 

  isLoggedIn() {
      if(localStorage.getItem('connectedUser')){
        return true
      } else{
        return false;
      }
  }

  forgotPassword(phoneNumber): Observable<any>  {
    const headers = {'content-type': 'application/json'}  
    const body = phoneNumber;
    console.log(body)
    return this.http.post(environment.apiBaseUrl+'/forgot-password', body,{'headers':headers})
  }

  verifyCode(code): Observable<any> {
    const headers = {'content-type': 'application/json'}  
    const body = {'code': code};
    console.log(body)
    return this.http.post(environment.apiBaseUrl+'/verifycode', body,{'headers':headers})
  }

  logout(): Observable<any> {
    return this.http.get(environment.apiBaseUrl+'/deconnexion')
  }

  deleteUserData(){
    localStorage.removeItem('connectedUser')
  }

  updateUser(user): Observable<any> {
    const headers = {'content-type': 'application/json'}  
    const body = user;
    console.log(body)
    return this.http.post(environment.apiBaseUrl+'/updateUser', body,{'headers':headers})
  }
}
