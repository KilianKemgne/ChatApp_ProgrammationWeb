import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface TableData {
  headerRow: string[];
  dataRows;
}

@Component({
  selector: 'app-newContact',
  templateUrl: './newContact.component.html',
  styleUrls: ['./newContact.component.scss']
})
export class NewContactComponent implements OnInit {

  @Input() contactName:string;

  @Input() contactNumber="";

  isCorrectName=false

  isCorrectNumber=false


  constructor() { }

  ngOnInit() {
  }

  addNewContact(){

  }

  onResetFields(){
    console.log("fields resets")

    this.contactName="";
    this.contactNumber="";
  }

  

  onLogout(){
    
  }
  
}
