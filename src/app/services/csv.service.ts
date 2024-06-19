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

  async loadCsvFiles() {
    const filePaths = [
    'assets/sn_deal_2020_2022_journal_list_2019-12-31.CSV', 
    'assets/sn_deal_2020_2022_journal_list_2020-04-17.CSV',
    'assets/sn_deal_2020_2022_journal_list_2022-04-04.CSV',
    'assets/sn_deal_2020_2023_journal_list_2023-05-04.CSV',
    'assets/wiley_deal_2019_2021_journal_list_2020-10-12.CSV',
    'assets/wiley_deal_2019_2021_journal_list_2021-09-27.CSV',
    'assets/wiley_deal_2019_2022_journal_list_2022-04-29.CSV',
    'assets/wiley_deal_2019_2023_journal_list_2023-05-09.CSV'
    ]; 
    for (let index = 0; index < filePaths.length; index++) {
      this.getCsvFile(filePaths[index]).subscribe(
        (csvData) => {
          this.parseCsv(csvData);
        }
      )
    }
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
