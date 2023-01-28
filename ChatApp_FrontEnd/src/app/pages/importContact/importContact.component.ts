import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/shared/contact.service';
//import * as XLSX from 'xlsx';

declare interface TableData {
  headerRow: string[];
  dataRows;
}

@Component({
  selector: 'app-importContact',
  templateUrl: './importContact.component.html',
  styleUrls: ['./importContact.component.scss']
})
export class ImportContactComponent implements OnInit {

  isCorrectNumber=false
  isCorrectName=false

  //file:File
  arrayBuffer:any
  filelist:any
  fileName: any
  
  constructor(private contactService:ContactService){}

  getComponent(event:any){
    this.fileName = event.target.files[0];
  }

  //read excel file and send data to the server
  addfile()     
  {    
  //this.file= event.target.files[0];     
  let fileReader = new FileReader();    
  fileReader.readAsArrayBuffer(this.fileName);     
  fileReader.onload = (e) => {    
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
   /*   var workbook = XLSX.read(bstr, {type:"binary"});    
      var first_sheet_name = workbook.SheetNames[0];    
      var worksheet = workbook.Sheets[first_sheet_name];    
      console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
        var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
            this.filelist = [];    
        
        this.contactService.importContact({data:XLSX.utils.sheet_to_json(worksheet,{raw:true}),id:JSON.parse(localStorage.getItem('connectedUser')).id})
        //JSON.parse(localStorage('connectedUser')).id
            .subscribe(() => {
        alert('Contact imported successfully!')
        
      }, (err) => {
        console.log(err);
    });*/
            //console.log(this.filelist)    
    
  }    
}

  ngOnInit() {
  }

  

  onLogout(){
    
  }
  
}
