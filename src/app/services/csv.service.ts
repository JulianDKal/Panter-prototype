import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CSVService {
  
  public onGotCsvData?: CsvParsedEventHandler;

  constructor(private http: HttpClient) { }

  getCsvFile(filePath: string): Observable<string> {
    return this.http.get(filePath, { responseType: 'text' });
  }

  async loadCsvFile() {
    const filePath = 'assets/sn_deal_2020_2022_journal_list_2019-12-31.CSV'; 
    this.getCsvFile(filePath).subscribe(
      csvData => { 
        this.parseCsv(csvData);
        //console.log(csvData);
      })
}

parseCsv(csvData: string): void {
  const parsedData = Papa.parse(csvData, {
    header: true,
    complete: (results) => {
      if(!this.onGotCsvData) { //falls kein handler registriert ist, returnen
        console.log("Kein Handler für das onGotCsvData event registriert");
        return;
      }  
      this.onGotCsvData(results); //event emitten
      //console.log(this.data);
    }
  });

}

}
