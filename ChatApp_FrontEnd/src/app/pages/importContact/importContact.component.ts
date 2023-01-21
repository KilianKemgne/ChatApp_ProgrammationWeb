import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface TableData {
  headerRow: string[];
  dataRows;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './importContact.component.html',
  styleUrls: ['./importContact.component.scss']
})
export class ImportContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  

  onLogout(){
    
  }
  
}
