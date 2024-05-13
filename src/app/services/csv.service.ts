import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CSVService {

  constructor(private http: HttpClient) { }

  getCsvFile(filePath: string): Observable<string> {
    return this.http.get(filePath, { responseType: 'text' });
  }

}
