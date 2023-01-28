import { Injectable } from '@angular/core';
//import { Contact } from './Contact';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // Node/Express API
  REST_API: string = 'https://parrot-backend.hirodiscount.com/contacts' ;
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  

  importContact(data:any){
    return this.http.post(`${this.REST_API}/import`, data)
  }
  
  getContacts() {
    return this.http.get(`${this.REST_API}`);
  }

  createContact(contact: Object) {
    return this.http.post(`${this.REST_API}`, contact);
  }

  getContact(id: number) {
    return this.http.get(`${this.REST_API}/${id}`);
  }

  updateContact(id: number, contact: Object) {
    return this.http.put(`${this.REST_API}/${id}`, contact);
  }

  deleteContact(id: number) {
    return this.http.delete(`${this.REST_API}/${id}`);
  }
}
