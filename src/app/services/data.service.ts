import { Injectable, Inject } from '@angular/core';
import { CSVService } from './csv.service';
import * as Papa from 'papaparse';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  //Springer Datensatz 2019-12-31:
  firstDataObj?:Papa.ParseResult<snDealRows>;
  journalIDs:number[] = [];
  journalTitles:string[] = [];
  mainDisciplines:string[] = [];
  countsOfDisciplines?:CountMap;
  
  //Springer Datensatz 2020-04-17:
  secondDataObj?:Papa.ParseResult<snDealRows>;
  //Springer Datensatz 2022-04-04
  thirdDataObj?:Papa.ParseResult<snDealRows>;
  //Springer Datensatz 2023-05-04
  fourthDataObj?:Papa.ParseResult<snDealRows>;

  eventCount:number = 0;
  constructor(private csvService:CSVService) 
  {
    csvService.loadCsvFiles();
    csvService.onGotCsvData = (results) => {
      switch (this.eventCount) {
        case 0:
              this.firstDataObj = results;
          if(this.firstDataObj){
            for (let i = 0; i < this.firstDataObj.data.length; i++) {
              this.journalIDs[i] = this.firstDataObj.data[i]["SN Journals ID"];
              this.journalTitles[i] = this.firstDataObj.data[i]["Journal Title"];
              this.mainDisciplines[i] = this.firstDataObj.data[i]["Main Discipline"];
            }
            this.countsOfDisciplines = this.countOccurrences(this.mainDisciplines);
            //counts of Discpiplines are reduced here!!
            this.reduceOccurrences(this.countsOfDisciplines);
            console.log(this.countsOfDisciplines);
          }
          //console.log(this.firstDataObj);
          this.eventCount++;
          break;
        case 1:
          this.secondDataObj = results;
          //console.log(this.secondDataObj);
          this.eventCount++;
          break;
        case 2:
          this.thirdDataObj = results;
          //console.log(this.thirdDataObj);
          this.eventCount++;
          break;
        case 3:
          this.fourthDataObj = results;
          //console.log(this.fourthDataObj);
          break;
        default:
          break;
      }
    }
  }

  //gibt die Häufigkeiten der Einträge als oben definierter CountMap typ zurück
  //z.B. result = {"Mathematik": 345, "Physics":  124, ...}
  countOccurrences(arr: string[]): CountMap {
    const counts: CountMap = {};
    for (const item of arr) {
      if (counts[item]) {
        counts[item]++;
      } else {
        counts[item] = 1;
      }
    }
    return counts;
  }

  reduceOccurrences(obj:CountMap) {
    for (let key in obj) {
      if(obj[key] < 100) delete obj[key];
    }
  }

}
