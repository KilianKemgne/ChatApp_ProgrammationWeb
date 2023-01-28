import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { SMS } from './message.model';


@Injectable({
  providedIn: 'root'
})
export class messageService {
  selectedSMS: SMS = {
    Content: '',
    creationDate: '',
    iduser: JSON.parse(localStorage.getItem('connectedUser')).id,
    idcontact: ''
  };

 // Node/Express API
 REST_API: string = 'http://127.0.0.1:5000/messages';

 noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { } 

  
  getSMS() {
    return this.http.get(`${this.REST_API}`);
  }

  createSMS(sms: Object) {
    return this.http.post(`${this.REST_API}/newsms`, sms);
  }

  getSMSContact(id: number) {
    return this.http.get(`${this.REST_API}/${id}`);
  }

  getSMSbyContact() {
    return this.http.get(`${this.REST_API}/congroupby`);
  }

  deleteMessage(id: number) {
    return this.http.delete(`${this.REST_API}/${id}`);
  }
}
