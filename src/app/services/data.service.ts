import { Injectable, Inject } from '@angular/core';
import { CSVService } from './csv.service';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataObj:any;
  journalIDs:number[] = [];
  //...

  //csvService:CSVService = Inject(CSVService);

  constructor(private csvService:CSVService) 
  {
    csvService.loadCsvFile();
    csvService.onGotCsvData = (results) => {
      this.dataObj = results;
      for (let i = 0; i < this.dataObj.data.length; i++) {
        this.journalIDs[i] = this.dataObj.data[i][1];
        
      }
      console.log(this.journalIDs);
    }
  }

}
