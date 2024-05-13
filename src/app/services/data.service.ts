import { Injectable, Inject } from '@angular/core';
import { CSVService } from './csv.service';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data = {};
  //csvService:CSVService = Inject(CSVService);

  constructor(private csvService:CSVService) 
  {
    this.loadCsvFile();
    console.log(this.data);
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
      header: true
    });
    console.log(parsedData);
  }


}
