import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface TableData {
  headerRow: string[];
  dataRows;
}

@Component({
  selector: 'app-sendMessage',
  templateUrl: './sendMessage.component.html',
  styleUrls: ['./sendMessage.component.scss']
})
export class SendMessageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  

  onLogout(){
    
  }
  
}
