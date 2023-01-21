import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface TableData {
  headerRow: string[];
  dataRows;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './newContact.component.html',
  styleUrls: ['./newContact.component.scss']
})
export class NewContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  

  onLogout(){
    
  }
  
}
