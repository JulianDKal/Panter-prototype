import { Injectable, Inject } from '@angular/core';
import { CSVService } from './csv.service';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataObj?:Papa.ParseResult<snDealRows>;
  journalIDs:number[] = [];
  journalTitles:string[] = [];
  //...

  constructor(private csvService:CSVService) 
  {
    csvService.loadCsvFile();
    csvService.onGotCsvData = (results) => {
      this.dataObj = results;
      if(this.dataObj){
        for (let i = 0; i < this.dataObj.data.length; i++) {
          this.journalIDs[i] = this.dataObj.data[i]["SN Journals ID"];
          this.journalTitles[i] = this.dataObj.data[i]["Journal Title"];
        }
      }
      console.log(this.journalTitles);
      console.log(this.journalIDs);
    }
  }

}
