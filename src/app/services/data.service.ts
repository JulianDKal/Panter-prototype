import { Injectable, Inject } from '@angular/core';
import { CSVService } from './csv.service';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataObj = {};
  journalIDs:number[] = [];

  public onGotCsvData?: () => void;
  //csvService:CSVService = Inject(CSVService);

  constructor(private csvService:CSVService) 
  {
    this.loadCsvFile();
    //console.log(this.data);
  }

  async loadCsvFile() {
      const filePath = 'assets/sn_deal_2020_2022_journal_list_2019-12-31.CSV'; 
      this.csvService.getCsvFile(filePath).subscribe(
        csvData => {
          this.parseCsv(csvData);
          //console.log(csvData);
        })
  }

  parseCsv(csvData: string): void {
    const parsedData = Papa.parse(csvData, {
      header: true,
      complete: (results) => this.dataObj = results
    });

    if(!this.onGotCsvData) { //falls kein handler registriert ist, returnen
      console.log("Kein Handler für das onGotCsvData event registriert");
      return;
    }  
    this.onGotCsvData(); //event emitten
    //console.log(this.data);
  }


}
