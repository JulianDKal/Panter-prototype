import { Injectable, Inject, EventEmitter } from '@angular/core';
import { CSVService } from './csv.service';
import * as Papa from 'papaparse';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  dataReady: EventEmitter<void> = new EventEmitter<void>();
  public isProcessing:boolean = true;

  //Springer Datensatz 2019-12-31:
  firstDataObj?:Papa.ParseResult<snDealRows>;
  journalIDs:number[] = [];
  journalTitles:string[] = [];
  mainDisciplines:string[] = [];
  apcPrices:string[] = [];
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
              this.apcPrices[i] = this.firstDataObj.data[i]["APC"];
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

          this.dataReady.emit(); //event is sent to the portfolio component so the charts etc. can get rendered
          this.isProcessing = false;

          break;
        default:
          break;
      }

      }
    //this.dataReady.emit();
  }

  generateCountMap(keys:string[], values:string[]):CountMap {
    const cumulativeMap: { [key: string]: { sum: number; count: number } } = {};
    const counts: CountMap = {};
    let price;

    for (let index = 0; index < keys.length; index++) {
      if(!cumulativeMap[keys[index]]){
        cumulativeMap[keys[index]] = { sum: 0, count: 0 };
      }

      price = parseInt(values[index]);

      if(!isNaN(price)){
        cumulativeMap[keys[index]].sum += price;
        cumulativeMap[keys[index]].count += 1;
      }
      
    }

    for (const str in cumulativeMap){
      if (cumulativeMap.hasOwnProperty(str) && cumulativeMap[str].count >= 10 ) {
        const { sum, count } = cumulativeMap[str];
        counts[str] = sum / count;
      }
    }
    
    return counts;
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
  //Nur wichtig für das zählen der Häufigkeiten von Disziplinen
  reduceOccurrences(obj:CountMap) {
    for (let key in obj) {
      if(obj[key] < 100) delete obj[key];
    }
  }

}
